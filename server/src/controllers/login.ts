import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express, { RequestHandler } from 'express';
import User from '../models/user';
import helper from '../utils/helper';
import config from '../utils/config';

const router = express.Router();

router.post('/', (async (req, res) => {
  const { username, password } = helper.toNewAuth(req.body);

  const user = await User.findOne({ username });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken: jwt.UserForTokenPayload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

  return res.status(200).send({ token, username: user.username, name: user.name });
}) as RequestHandler);

export default router;