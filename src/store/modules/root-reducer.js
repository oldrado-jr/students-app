import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './example/example-slice';

const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
