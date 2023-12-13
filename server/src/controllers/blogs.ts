/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { RequestHandler } from 'express';
import Blog from '../models/blog';
import helper from '../utils/helper';
import { IUser } from '../types';
import { CustomReq, asyncHandler } from '../utils/middleware';
import { userExtractor } from '../utils/middleware';

const router = express.Router();

router.use(userExtractor);

router.get('/', asyncHandler(async (_req, res) => {
  const blogs = await Blog
    .find({})
    .populate<{ user: IUser }>('user', { username: 1, name: 1 });
  res.json(blogs);
}) as RequestHandler);

router.post('/', asyncHandler(async (req: CustomReq, res) => {
  const { title, author, url, likes } = helper.toNewBlog(req.body);
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  const blog = new Blog({
    title, author, url, likes,
    user: user._id
  });

  await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  const createdBlog = await Blog.findById(blog._id).populate<{ user: IUser }>('user', { username: 1, name: 1 });
  return res.status(201).json(createdBlog);
}) as RequestHandler);

router.put('/:id', asyncHandler(async (req: CustomReq, res) => {
  const { title, author, url, likes } = helper.toNewBlog(req.body);
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(400).json({ error: 'blog not find' });
  } else if (!user) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, {
      title, author, url, likes
    }, { new: true, runValidators: true, context: 'query' })
    .populate<{ user: IUser }>('user', { username: 1, name: 1 });

  return res.json(updatedBlog);
}) as RequestHandler);

router.delete('/:id', asyncHandler(async (req: CustomReq, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(400).json({ error: 'blog not find' });
  } else if (!user || blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString());
  await user.save();

  await blog.deleteOne();

  return res.status(204).end();
}) as RequestHandler);

router.post('/:id/comments', asyncHandler(async (req: CustomReq, res) => {
  const user = req.user;
  const { comment } = helper.toNewComent(req.body);

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(400).json({ error: 'blog not found' });
  } else if (!user) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  blog.comments = blog.comments.concat(comment);
  await blog.save();

  return res.json(blog);
}) as RequestHandler);

export default router;