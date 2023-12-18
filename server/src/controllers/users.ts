/* eslint-disable @typescript-eslint/no-misused-promises */
import bcrypt from 'bcrypt';
import express, { RequestHandler } from 'express';
import User from '../models/user';
import { IBlog } from '../types';
import helper from '../utils/helper';
import { CustomReq, asyncHandler } from '../utils/middleware';
import { userExtractor } from '../utils/middleware';

const router = express.Router();
router.use(userExtractor);

router.get('/', (async (_req, res) => {
  const users = await User.find({})
    .populate<{ blog: IBlog }>('blogs', { title: 1, author: 1, url: 1, likes: 1 });
  res.json(users);
}) as RequestHandler);

router.post('/', asyncHandler(async (req, res) => {
  const { username, name, password } = helper.toNewUser(req.body);

  if (!password || password.length < 6) {
    return res.status(400).json({
      error: '`password` is shorter than the minimum allowed length (6)'
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username, name, passwordHash
  });
  const savedUser = await user.save();
  return res.status(201).json(savedUser);
}) as RequestHandler);

router.get('/check', asyncHandler((req: CustomReq, res) => {
  const user = req.user;
  if (!user) return res.status(400).json({ error: 'token expired' });
  return res.status(200).json({ message: 'valid token' });
}));

export default router;