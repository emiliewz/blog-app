import { Types } from 'mongoose';

interface BaseUser {
  username: string,
  name: string,
}

export interface BaseBlog {
  title: string,
  author: string,
  url: string,
  likes: number,
}

export interface IBlog extends BaseBlog {
  likes: number,
  comments: string[],
  user: Types.ObjectId,
}

export interface IUser extends BaseUser {
  passwordHash: string,
  blogs: Types.ObjectId[],
}

export interface UserEntry extends BaseUser {
  password: string
}

export interface BaseAuth {
  username: string,
  password: string,
}



