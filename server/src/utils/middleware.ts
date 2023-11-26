import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from './config';
import User from '../models/user';
import { IUser } from '../types';
import { Types, Document } from 'mongoose';

declare module 'jsonwebtoken' {
  export interface UserForTokenPayload extends JwtPayload {
    username: string,
    id: Types.ObjectId,
  }
}

export interface CustomReq extends Request {
  token?: string | null,
  user?: Document<unknown, Record<string, never>, IUser> & IUser & { _id: Types.ObjectId } | null
}

const getTokenFrom = (req: Request): string | null => {
  const authorization = req.get('authorization');

  const token = authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null;
  return token;
};

const tokenExtractor = (req: CustomReq, _res: Response, next: NextFunction) => {
  req.token = getTokenFrom(req);
  next();
};

const userExtractor = async (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFrom(req);
  if (token) {
    const decodedToken = <jwt.UserForTokenPayload>jwt.verify(token, config.SECRET);
    if (!decodedToken.id) {
      res.status(401).json({ error: 'token invalid' });
    } else {
      const user = await User.findById(decodedToken.id);
      (req as CustomReq).user = user;
    }
  }
  next();
};

const unknownEndPoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid token' });
  } else if (error.name === 'TokenExpiredError') {
    res.status(401).json({ error: 'token expired' });
  }
  next(error);
};

export {
  tokenExtractor,
  userExtractor,
  unknownEndPoint,
  errorHandler,
};