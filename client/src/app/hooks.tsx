import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState } from 'react';
import { initializeUsers } from '../reducers/users';
import { initializeUser } from '../reducers/user';
import { initializeBlogs } from '../reducers/blogs';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type FieldEntry = {
  type: string,
  value: string,
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
};

export const useField = (type: string): FieldEntry => {
  const [value, setValue] = useState<string>('');

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return {
    type,
    value,
    onChange
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
