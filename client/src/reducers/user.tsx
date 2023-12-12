import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSliceState } from '../app/types';

const initialState: UserSliceState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserSliceState | null,
  reducers: {
    set(_state, { payload }: PayloadAction<UserSliceState>) {
      return payload;
    },
    clear(_state, _action) {
      return initialState;
    }
  }
});

export const { set, clear } = userSlice.actions;

export default userSlice.reducer;
