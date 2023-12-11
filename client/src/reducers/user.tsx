import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface userSliceState {
  name: string,
  username: string,
  token: string,
}

const initialState: userSliceState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as userSliceState | null,
  reducers: {
    set(_state, { payload }: PayloadAction<userSliceState>) {
      return payload;
    }
  }
});

export const { set } = userSlice.actions;

export default userSlice.reducer;
