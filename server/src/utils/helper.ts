import { BaseBlog, UserEntry } from '../types';

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

const toNewUser = (object: unknown): UserEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('username' in object && 'name' in object && 'password' in object) {
    const newUserEntry: UserEntry = {
      username: parseString(object.name),
      name: parseString(object.name),
      password: parseString(object.password),
    };
    return newUserEntry;
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

export default {
  toNewUser,
  toNewBlog,
};
