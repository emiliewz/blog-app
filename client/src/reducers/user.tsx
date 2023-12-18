import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginEntry, UserSliceState } from '../app/types';
import { AppThunk } from '../app/store';
import storageService from '../services/storage';
import blogsService from '../services/blogs';
import loginService from '../services/login';
import usersService from '../services/users';
import { notify } from './info';

const initialState: UserSliceState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserSliceState | null,
  reducers: {
    set(_state, { payload }: PayloadAction<UserSliceState>) {
      return payload;
    },
    clear() {
      return initialState;
    }
  }
});

const { set, clear } = userSlice.actions;

export const initializeUser = (): AppThunk => {
  return async dispatch => {
    const user: UserSliceState | null = storageService.getUser();
    if (user) {
      try {
        await usersService.check(blogsService.setHeaders(user.token));
        dispatch(set(user));
      } catch (exception) {
        dispatch(notify('Oops, the token has expired. Please log in', 'error'));
        dispatch(logOut());
      }
    }
  };
};

export const loginWith = (credentials: LoginEntry): AppThunk => {
  return async dispatch => {
    const user: UserSliceState = await loginService.login(credentials);
    storageService.saveUser(user);
    dispatch(set(user));
  };
};

export const logOut = (): AppThunk => {
  return async dispatch => {
    storageService.clearUser();
    dispatch(clear());
  };
};


export default userSlice.reducer;
