/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: '',
    user: {},
  },
  reducers: {
    loginSucceeded(state, action) {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
    },
    loginFailed(state, action) {
      state.isLoggedIn = false;
      state.token = '';
      state.user = {};
    },
    registerSucceeded(state, action) {
      const { name, email } = action.payload;
      state.user.nome = name;
      state.user.email = email;
    },
  },
});

export const { loginSucceeded, loginFailed, registerSucceeded } =
  loginSlice.actions;
export default loginSlice.reducer;
