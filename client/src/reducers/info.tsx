import { createSlice } from '@reduxjs/toolkit';
import { InfoSliceState } from '../app/types';

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
    clear(_state, _action) {
      return initialState;
    }
  }
});

export const { set, clear } = infoSlice.actions;

export default infoSlice.reducer;