import { BaseAuth, BaseBlog, UserEntry, BaseComment } from '../types';

const toNewUser = (object: unknown): UserEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('username' in object && 'name' in object && 'password' in object) {
    const newUserEntry: UserEntry = {
      username: parseString(object.username),
      name: parseString(object.name),
      password: parseString(object.password),
    };
    return newUserEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewBlog = (object: unknown): BaseBlog => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('title' in object && 'author' in object && 'url' in object) {
    const newBlogEntry: BaseBlog = {
      title: parseString(object.title),
      author: parseString(object.author),
      url: parseString(object.url),
      likes: 'likes' in object ? parseNumber(object.likes) : 0,
    };
    return newBlogEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewAuth = (object: unknown): BaseAuth => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('username' in object && 'password' in object) {
    const newAuthEntry: BaseAuth = {
      username: parseString(object.username),
      password: parseString(object.password),
    };
    return newAuthEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect or missing ${text}`);
  }
  return text;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseNumber = (num: unknown): number => {
  if (!isNumber(num)) {
    throw new Error(`Incorrect or missing ${num}`);
  }
  return num;
};

const toNewComent = (object: unknown): BaseComment => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('comment' in object) {
    const newCommentEntry: BaseComment = {
      comment: parseString(object.comment),
    };
    return newCommentEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default {
  toNewUser,
  toNewBlog,
  toNewAuth,
  toNewComent,
};
