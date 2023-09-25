import { all, takeLatest } from 'redux-saga/effects';
import * as actions from './auth-slice';

function loginRequest({ payload }) {
  console.log('Saga', payload);
}

export default all([takeLatest(actions.loginRequested.type, loginRequest)]);
