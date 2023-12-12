import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BlogsSliceState } from '../app/types';

const initialState: BlogsSliceState[] = [];

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<BlogsSliceState[]>) {
      return payload;
    },
    create(state, { payload }: PayloadAction<BlogsSliceState>) {
      return state.concat(payload);
    },
    update(state, { payload }: PayloadAction<BlogsSliceState>) {
      return state.map(b => b.id !== payload.id ? b : payload);
    },
    remove(state, { payload }: PayloadAction<string>) {
      const id = payload;
      return state.filter(b => b.id !== id);
    }
  }
});

export const { set, create, update, remove } = blogsSlice.actions;
export default blogsSlice.reducer;