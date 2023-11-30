import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Blog from '../models/blog';
import User from '../models/user';
import { blogsInDb, initialBlogs, initialUsers } from './test_helper';
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
});


afterAll(async () => {
  await mongoose.connection.close();
});