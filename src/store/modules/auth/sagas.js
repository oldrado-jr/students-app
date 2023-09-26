import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import axios from '../../../services/axios';
import history from '../../../services/history';
import * as types from './types';
import { loginFailed, loginSucceeded, registerSucceeded } from './actions';

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

function* registerRequested({ payload }) {
  const { id, name, email, password } = payload;
  const payloadApi = {
    nome: name,
    email,
  };

  if (password) {
    payloadApi.password = password;
  }

  try {
    if (id) {
      yield call(axios.put, '/users', payloadApi);
      toast.success('Dados alterados com sucesso!');
      yield put(registerSucceeded({ name, email }));
    } else {
      yield call(axios.post, '/users', payloadApi);
      toast.success('Você fez seu cadastro!');
      history.push('/login');
    }
  } catch (error) {
    const errorsApi = get(error, 'response.data.errors', []);
    const status = get(error, 'response.status', 0);

    if (status === 401) {
      toast.info('Você precisa fazer login novamente!');
      yield put(loginFailed());
      history.push('/login');
      return;
    }

    if (errorsApi.length > 0) {
      errorsApi.map((err) => toast.error(err));
    } else {
      toast.error('Erro desconhecido!');
    }
  }
}

export default all([
  takeLatest(types.AUTH_LOGIN_REQUESTED, loginRequest),
  takeLatest(types.AUTH_REGISTER_REQUESTED, registerRequested),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
