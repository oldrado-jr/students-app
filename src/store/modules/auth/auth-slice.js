/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: '',
    user: {},
    isLoading: false,
  },
  reducers: {
    loginSucceeded(state, action) {
      console.log('Sucesso =D');
    },
    loginFailed(state, action) {
      console.log('Deu ruim =(');
    },
    loginRequested(state, action) {
      console.log('Reducer', action.payload);
    },
  },
});

export const { loginSucceeded, loginFailed, loginRequested } =
  loginSlice.actions;
export default loginSlice.reducer;
