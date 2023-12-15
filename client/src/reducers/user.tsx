import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSliceState } from '../app/types';
import { AppThunk } from '../app/store';
import storageService from '../services/storage';

const initialState: UserSliceState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserSliceState | null,
  reducers: {
    set(_state, { payload }: PayloadAction<UserSliceState>) {
      return payload;
    },
    clear() {
      return initialState;
    }
  }
});

const { set } = userSlice.actions;

export const initializeUser = (): AppThunk => {
  return async dispatch => {
    const user: UserSliceState | null = storageService.getUser();
    if (user) dispatch(set(user));
  };
};

export default userSlice.reducer;
