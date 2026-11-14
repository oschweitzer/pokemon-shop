import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  /** Email of the signed-in user. */
  email: string | null;
  /** False until Firebase has told us whether somebody is signed in. */
  ready: boolean;
}

const initialState: AuthState = { email: null, ready: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userChanged(state, action: PayloadAction<string | null>) {
      state.email = action.payload;
      state.ready = true;
    },
  },
});

export const { userChanged } = authSlice.actions;
export const authReducer = authSlice.reducer;
