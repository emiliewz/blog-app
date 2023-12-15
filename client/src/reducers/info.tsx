import { createSlice } from '@reduxjs/toolkit';
import { InfoSliceState } from '../app/types';
import { AppThunk } from '../app/store';

const initialState: InfoSliceState = {
  message: null,
  type: null
};

const infoSlice = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    set(_state, { payload }) {
      return payload;
    },
    clear() {
      return initialState;
    }
  }
});

export const { set, clear } = infoSlice.actions;

export const notify = (message: string, type = 'info'): AppThunk => {
  return async dispatch => {
    dispatch(set({ message, type }));
    setTimeout(() => {
      dispatch(clear());
    }, 3000);
  };
};

export default infoSlice.reducer;