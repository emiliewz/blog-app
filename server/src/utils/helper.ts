import { BaseAuth, BaseBlog, UserEntry, BaseComment } from '../types';

const DataEntryError = (message: string): Error => {
  const e = new Error(message);
  e.name = 'DataEntryError';
  return e;
};

const toNewUser = (object: unknown): UserEntry => {
  if (!object || typeof object !== 'object') {
    throw DataEntryError('Incorrect or missing data');
  }
  if ('username' in object && 'name' in object && 'password' in object) {
    const newUserEntry: UserEntry = {
      username: parseString(object.username),
      name: parseString(object.name),
      password: parseString(object.password),
    };
    return newUserEntry;
  }
  throw DataEntryError('Incorrect data: some fields are missing');
};

const toNewBlog = (object: unknown): BaseBlog => {
  if (!object || typeof object !== 'object') {
    throw DataEntryError('Incorrect or missing data');
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
  throw DataEntryError('Incorrect data: some fields are missing');
};

const toNewAuth = (object: unknown): BaseAuth => {
  if (!object || typeof object !== 'object') {
    throw DataEntryError('Incorrect or missing data');
  }
  if ('username' in object && 'password' in object) {
    const newAuthEntry: BaseAuth = {
      username: parseString(object.username),
      password: parseString(object.password),
    };
    return newAuthEntry;
  }
  throw DataEntryError('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw DataEntryError(`Incorrect or missing ${text}`);
  }
  return text;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseNumber = (num: unknown): number => {
  if (!isNumber(num)) {
    throw DataEntryError(`Incorrect or missing ${num}`);
  }
  return num;
};

const toNewComent = (object: unknown): BaseComment => {
  if (!object || typeof object !== 'object') {
    throw DataEntryError('Incorrect or missing data');
  }
  if ('comment' in object) {
    const newCommentEntry: BaseComment = {
      comment: parseString(object.comment),
    };
    return newCommentEntry;
  }
  throw DataEntryError('Incorrect data: some fields are missing');
};

export default {
  toNewUser,
  toNewBlog,
  toNewAuth,
  toNewComent,
};
