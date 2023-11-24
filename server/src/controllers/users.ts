import express, { RequestHandler } from 'express';
import User from '../models/user';

const router = express.Router();

router.get('/', (async (_req, res) => {
  const users = await User.find({})
    .populate('blog', { title: 1, author: 1, url: 1, likes: 1 });
  res.json(users);
}) as RequestHandler);

