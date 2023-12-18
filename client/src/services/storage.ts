import { UserSliceState } from '../app/types';
import blogsService from '../services/blogs';

const KEY: string = 'blogApp';

const saveUser = (u: UserSliceState): void => {
  blogsService.setHeaders(u.token);
  localStorage.setItem(KEY, JSON.stringify(u));
};

const getUser = (): UserSliceState | null => {
  const user = window.localStorage.getItem(KEY);
  if (user) {
    blogsService.setHeaders(JSON.parse(user).token);
    return JSON.parse(user);
  }
  return null;
};

const clearUser = (): void => localStorage.removeItem(KEY);


export default {
  saveUser,
  getUser,
  clearUser
};
