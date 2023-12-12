import { UserSliceState } from '../app/types';

const KEY = 'blogApp';

const saveUser = (u: UserSliceState) => localStorage.setItem(KEY, JSON.stringify(u));

const getUser = () => {
  const user = window.localStorage.getItem(KEY);
  if (user) return JSON.parse(user);
  return null;
};

const clearUser = () => localStorage.removeItem(KEY);


export default {
  saveUser,
  getUser,
  clearUser
};
