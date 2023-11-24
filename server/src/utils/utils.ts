import { UserEntry } from '../types';

const toNewUser = (object: unknown): UserEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('username' in object && 'name' in object && 'password' in object) {
    const newUserEntry: UserEntry = {
      username: parseUsername(object.name),
      name: parseName(object.name),
      password: parsePassword(object.password),
    };
    return newUserEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseUsername = (username: unknown): string => {
  if (!isString(username)) {
    throw new Error('Incorrect or missing username');
  }
  return username;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parsePassword = (password: unknown): string => {
  if (!isString(password)) {
    throw new Error('Incorrect or missing password');
  }
  return password;
};

export default {
  toNewUser
};