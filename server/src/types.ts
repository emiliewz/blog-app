import { Types } from 'mongoose';

export interface IBlog {
  title: string,
  author: string,
  url: string,
  likes: number,
  comments: string[],
  user: Types.ObjectId
}


