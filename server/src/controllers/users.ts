import bcrypt from 'bcrypt';
import express, { RequestHandler } from 'express';
import User from '../models/user';
import { IBlog } from '../types';
import helper from '../utils/helper';

const router = express.Router();

router.get('/', (async (_req, res) => {
  const users = await User.find({})
    .populate<{ blog: IBlog }>('blogs', { title: 1, author: 1, url: 1, likes: 1 });
  res.json(users);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const { username, name, password } = helper.toNewUser(req.body);

    if (!password || password.length < 3) {
      return res.status(400).json({
        error: '`password` is shorter than the minimum allowed length (3)'
      });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username, name, passwordHash
    });
    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
}) as RequestHandler);

export default router;