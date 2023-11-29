import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Blog from '../models/blog';
import User from '../models/user';

interface InitialBlogEntry {
  title: string,
  author: string,
  url: string,
  likes: number
}

interface InitialUserEntry {
  username: string,
  password: string,
}
const api = supertest(app);

const initialBlogs: InitialBlogEntry[] = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
];

const initialUsers: InitialUserEntry[] = [
  {
    username: 'mluukka',
    password: 'secret',
  }
];

test('blogs are returned as json', async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await Blog.insertMany(initialBlogs);
  await api.post('/api/users').send(initialUsers[0]);

  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

});

afterAll(async () => {
  await mongoose.connection.close();
});