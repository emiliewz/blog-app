// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState } from 'react';
import { initializeUsers } from '../reducers/users';
import { initializeUser, logOut } from '../reducers/user';
import { initializeBlogs } from '../reducers/blogs';
import { notify } from '../reducers/info';
import axios from 'axios';
import { BlogsSliceState } from './types';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type FieldEntry = {
  field: {
    type: string,
    value: string,
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
  },
  setValue: React.Dispatch<React.SetStateAction<string>>
};

export const useField = (type: string): FieldEntry => {
  const [value, setValue] = useState<string>('');

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return {
    field: {
      type,
      value,
      onChange
    }, setValue
  };
};

export const useInitialization = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(initializeUser());
  };
};

export const useNotification = () => {
  const dispatch = useAppDispatch();
  return (message: string, type = 'info') => {
    dispatch(notify(message, type));
  };
};

export const useLogOut = () => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(logOut());
  };
};

export const handleError = (error: unknown): string => {
  let message: string = '';
  if (axios.isAxiosError(error)) {
    message = error.response
      ? error.response.data.error
      : error.request
        ? error.request
        : error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};

export const byLikes = (a: BlogsSliceState, b: BlogsSliceState): number => b.likes - a.likes;
export const byComments = (a: BlogsSliceState, b: BlogsSliceState): number => b.comments.length - a.comments.length;
export const byCreateDate = (a: BlogsSliceState, b: BlogsSliceState): number => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();