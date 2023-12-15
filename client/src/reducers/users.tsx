import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserEntry, UsersSliceState } from '../app/types';
import usersService from '../services/users';
import { AppThunk } from '../app/store';

const initialState: UsersSliceState[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<UsersSliceState[]>) {
      return payload;
    },
    add(state, { payload }: PayloadAction<UsersSliceState>) {
      return state.concat(payload);
    },
    update(state, { payload }: PayloadAction<UsersSliceState>) {
      const blog = payload;
      return state.map(u => u.id !== blog.id ? u : blog);
    },
    remove(state, { payload }: PayloadAction<string>) {
      const id = payload;
      return state.filter(u => u.id !== id);
    }
  }
});

const { set, add } = usersSlice.actions;

export const initializeUsers = (): AppThunk => {
  return async dispatch => {
    const users: UsersSliceState[] = await usersService.getAll();
    dispatch(set(users));
  };
};

export const createUser = (object: UserEntry): AppThunk => {
  return async dispatch => {
    const user: UsersSliceState = await usersService.create(object);
    dispatch(add(user));
  };
};

export default usersSlice.reducer;

