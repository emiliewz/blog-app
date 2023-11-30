import Blog from '../models/blog';
import { BaseBlog, UserEntry } from '../types';

export const initialBlogs: BaseBlog[] = [
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
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
];

export const initialUsers: UserEntry[] = [
  {
    username: 'mluukka',
    name: 'mluukka',
    password: 'secret',
  }
];

export const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};