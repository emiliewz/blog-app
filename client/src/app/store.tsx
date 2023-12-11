import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/user';
import blogsReducer from '../reducers/blogs';
import usersReducer from '../reducers/users';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
