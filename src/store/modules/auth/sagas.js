import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import axios from '../../../services/axios';
import history from '../../../services/history';
import { AUTH_LOGIN_REQUESTED, PERSIST_REHYDRATE } from './types';
import { loginFailed, loginSucceeded } from './actions';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(loginSucceeded({ ...response.data }));
    history.push(payload.prevPath);
  } catch (error) {
    toast.error('Acesso inválido!');
    yield put(loginFailed());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');

  if (!token) {
    return;
  }

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(AUTH_LOGIN_REQUESTED, loginRequest),
  takeLatest(PERSIST_REHYDRATE, persistRehydrate),
]);
