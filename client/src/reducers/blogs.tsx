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
      return state.filter(b => b.id !== payload);
    }
  }
});

const { set, add, update, remove } = blogsSlice.actions;

export const initializeBlogs = (): AppThunk => {
  return async dispatch => {
    const blogs: BlogsSliceState[] = await blogsService.getAll();
    dispatch(set(blogs));
  };
};

export const createBlog = (object: BaseBlog): AppThunk => {
  return async dispatch => {
    const blog: BlogsSliceState = await blogsService.create(object);
    dispatch(add(blog));
  };
};

export const updateBlog = (object: BlogsSliceState): AppThunk => {
  return async disptach => {
    const blog: BlogsSliceState = await blogsService.update(object);
    disptach(update(blog));
  };
};

export const removeBlog = (id: string): AppThunk => {
  return async dispatch => {
    await blogsService.remove(id);
    dispatch(remove(id));
  };
};

export const commentBlog = (comment: string, { id }: BlogsSliceState): AppThunk => {
  return async dispatch => {
    const commentedBlog: BlogsSliceState = await blogsService.comment(comment, id);
    dispatch(update(commentedBlog));
  };
};

export default blogsSlice.reducer;