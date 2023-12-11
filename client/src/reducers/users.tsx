import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { blogSliceState } from './blogs';

export interface usersSliceState {
  username: string,
  password?: string,
  name: string
  id: string
  blogs: blogSliceState[]
}

export const initialState: usersSliceState[] = [
  {
    username: 'Alice',
    name: 'alice',
    id: '0',
    blogs: []
  },
  {
    username: 'Bob',
    name: 'bob',
    id: '1',
    blogs: []
  },
  {
    username: 'Charles',
    name: 'charles',
    id: '2',
    blogs: []
  }
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<usersSliceState[]>) {
      return payload;
    },
    create(state, { payload }: PayloadAction<usersSliceState>) {
      return state.concat(payload);
    }
  }
});

export const { set, create } = usersSlice.actions;

export default usersSlice.reducer;

