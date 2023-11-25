import express, { RequestHandler } from 'express';
import Blog from '../models/blog';
import helper from '../utils/helper';
import { IUser } from '../types';

const router = express.Router();

router.get('/', (async (_req, res) => {
  const blogs = await Blog
    .find({})
    .populate<{ user: IUser }>('user', { username: 1, name: 1 });
  res.json(blogs);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const { title, author, url } = helper.toNewBlog(req.body);

  const blog = new Blog({
    title, author, url,
  });

  await blog.save();
  res.status(201).json(blog);
}) as RequestHandler);

export default router;