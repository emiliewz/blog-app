import { Types } from 'mongoose';

export interface IBlog {
  title: string,
  author: string,
  url: string,
  likes: number,
  comments: string[],
  user: Types.ObjectId,
}

interface BaseUser {
  username: string,
  name: string,
}

export interface IUser extends BaseUser {
  passwordHash: string,
  blogs?: [Types.ObjectId],
}


export interface UserEntry extends BaseUser {
  password: string
}



