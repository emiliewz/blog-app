import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Blog from '../models/blog';
import User from '../models/user';
import { blogsInDb, initialBlogs, initialUsers } from './test_helper';
import { IBlog } from '../types';
const api = supertest(app);

describe('blogs api', () => {
  let authHeader: string;
  let token: string;

  beforeEach(async () => {
    await User.deleteMany({});

    const user = initialUsers[0];
    await api.post('/api/users').send(user);
    const response = await api.post('/api/login').send(user);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    token = response.body.token;
    // both of those two, token || authHeader, are ok to set authorization in request header
    authHeader = `Bearer ${response.body.token}`;
  });

  describe('a new blog', () => {
    const blog = initialBlogs[2];

    beforeEach(async () => {
      await Blog.deleteMany({});
    });

    test('can be added', async () => {
      await api.post('/api/blogs')
        .set('Authorization', authHeader)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await blogsInDb();
      expect(blogs).toHaveLength(1);
      const titles = blogs.map(r => r.title);
      expect(titles).toContain(blog.title);
    });

    test('has field id', async () => {
      await api.post('/api/blogs')
        .set('Authorization', authHeader)
        .send(blog)
        .expect(201);

      const blogs = await api.get('/api/blogs');
      expect(blogs.body[0].id).toBeDefined();
    });

    test('has likes initialized to 0 if initial value is not given', async () => {
      const blog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      };

      const response = await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(blog)
        .expect(201);

      expect(response.body.likes).toBe(0);
    });

    test('if title is missing, creation fails', async () => {
      const blog = {
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      };

      await api.post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(blog)
        .expect(400);

    });

    test('if author is missing, creation fails', async () => {
      const blog = {
        title: 'Go To Statement Considered Harmful',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', authHeader)
        .send(blog)
        .expect(400);
    });

    test('fails with status code 401 if a token is not provided', async () => {
      const blog = initialBlogs[2];

      const result = await api.post('/api/blogs')
        .send(blog)
        .expect(401);

      expect(result.body.error).toContain('operation not permitted');
    });
  });

  describe('when there are blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({});

      await Promise.all(initialBlogs.map(blog =>
        api.post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)));
    });

    test('blogs are returned as json', async () => {
      await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(initialBlogs.length);
    });
  });

  describe('a blog', () => {
    let id: string;
    let blogsBefore: (mongoose.Document<unknown, unknown, IBlog> & IBlog & { _id: mongoose.Types.ObjectId })[];
    beforeEach(async () => {
      await Blog.deleteMany({});
      await api.post('/api/blogs')
        .set('Authorization', authHeader)
        .send(initialBlogs[3]);

      blogsBefore = await blogsInDb();
      id = blogsBefore[0]._id.toString();
    });

    test('can be edited', async () => {
      const modifiedBlog = { title: 'new title', author: 'author', url: 'url', likes: 12 };
      await api.put(`/api/blogs/${id}`)
        .set('Authorization', authHeader)
        .send(modifiedBlog)
        .expect(200);
    });

    test('can be deleted by the creator', async () => {
      await api
        .delete(`/api/blogs/${id}`)
        .auth(token, { type: 'bearer' })
        .expect(204);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
    });

    test('can not be deleted without valid auth header', async () => {
      await api
        .delete(`/api/blogs/${id}`)
        .expect(401);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter).toHaveLength(blogsBefore.length);
    });

    test('can not be deleted by other user', async () => {
      const user = initialUsers[1];
      await api.post('/api/users').send(user);
      const response = await api.post('/api/login').send(user).expect(200);
      const newAuthHeader = `Bearer ${response.body.token}`;

      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', newAuthHeader)
        .expect(401);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter).toHaveLength(blogsBefore.length);
    });

    describe('a comment', () => {
      const comment: string = 'Your perspective is eye-opening.';
      test('can be posted on a blog with a valid token', async () => {
        await api
          .post(`/api/blogs/${id}/comments`)
          .set('Authorization', authHeader)
          .send({ comment })
          .expect(200);
      });

      test('can not be posted if a token is not provided', async () => {
        await api
          .post(`/api/blogs/${id}/comments`)
          .send({ comment })
          .expect(401);
      });
    });
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});