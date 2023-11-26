import express, { RequestHandler } from 'express';
import Blog from '../models/blog';
import helper from '../utils/helper';
import { IUser } from '../types';
import { CustomReq } from '../utils/middleware';
import { userExtractor } from '../utils/middleware';

const router = express.Router();

router.get('/', (async (_req, res) => {
  const blogs = await Blog
    .find({})
    .populate<{ user: IUser }>('user', { username: 1, name: 1 });
  res.json(blogs);
}) as RequestHandler);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', userExtractor, (async (req: CustomReq, res) => {
  const { title, author, url } = helper.toNewBlog(req.body);
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  const blog = new Blog({
    title, author, url,
    user: user._id
  });

  await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  const createdBlog = blog.populate<{ user: IUser }>('user', { username: 1, name: 1 });

  return res.status(201).json(createdBlog);
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const { title, author, url } = helper.toNewBlog(req.body);

  await Blog.findByIdAndUpdate(req.params.id, {
    title, author, url
  }, { new: true });

  const updatedBlog = await Blog.findById(req.params.id).populate<{ user: IUser }>('user', { username: 1, name: 1 });

  res.json(updatedBlog);
}) as RequestHandler);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/:id', userExtractor, (async (req: CustomReq, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);
  if (!user || blog?.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'operation not permitted' });
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString());

  await user.save();

  await blog.deleteOne();

  return res.status(204).end();
}) as RequestHandler);

export default router;