import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/user';
import blogsReducer from '../reducers/blogs';
import usersReducer from '../reducers/users';
import infoReducer from '../reducers/info';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    user: userReducer,
    info: infoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

export default store;
