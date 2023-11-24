import express, { RequestHandler } from 'express';
import Blog from '../models/blog';

const router = express.Router();

router.get('/', (async (_req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username:1, name:1 });
  res.json(blogs);
}) as RequestHandler);

// router.post('/', (async (req, res) => {

// }) as RequestHandler);

export default router;