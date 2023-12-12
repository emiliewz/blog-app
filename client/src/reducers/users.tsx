import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UsersSliceState } from '../app/types';

const initialState: UsersSliceState[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<UsersSliceState[]>) {
      return payload;
    },
    create(state, { payload }: PayloadAction<UsersSliceState>) {
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

export const { set, create, update, remove } = usersSlice.actions;

export default usersSlice.reducer;

