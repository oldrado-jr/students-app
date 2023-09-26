/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: {},
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceeded(state, action) {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
    },
    loginFailed(state, action) {
      state = { ...initialState };
    },
  },
});

export const { loginSucceeded, loginFailed } = loginSlice.actions;
export default loginSlice.reducer;
