/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    clickedButton: false,
  },
  reducers: {
    clickedButtonSucceeded(state, action) {
      console.log('Sucesso =D');
      // eslint-disable-next-line no-param-reassign
      state.clickedButton = !state.clickedButton;
    },
    clickedButtonFailed(state, action) {
      console.log('Deu ruim =(');
    },
    clickedButtonRequested(state, action) {
      console.log('Estou fazendo a requisição...');
    },
  },
});

export const {
  clickedButtonSucceeded,
  clickedButtonFailed,
  clickedButtonRequested,
} = exampleSlice.actions;
export default exampleSlice.reducer;
