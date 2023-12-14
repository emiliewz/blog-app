import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BaseBlog, BlogsSliceState } from '../app/types';
import blogsService from '../services/blogs';
import { AppThunk } from '../app/store';

const initialState: BlogsSliceState[] = [];

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<BlogsSliceState[]>) {
      return payload;
    },
    add(state, { payload }: PayloadAction<BlogsSliceState>) {
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

export const { set, add, update, remove } = blogsSlice.actions;

export const initializeBlogs = (): AppThunk => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    console.log(blogs);

    dispatch(set(blogs));
  };
};

export const createBlog = (object: BaseBlog): AppThunk => {
  return async dispatch => {
    const blog = await blogsService.create(object);
    dispatch(add(blog));
  };
};

export default blogsSlice.reducer;