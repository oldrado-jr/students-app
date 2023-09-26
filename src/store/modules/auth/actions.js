import { AUTH_LOGIN_REQUESTED } from './types';
import * as actions from './auth-slice';

export function loginRequested(payload) {
  return {
    type: AUTH_LOGIN_REQUESTED,
    payload,
  };
}

export function loginSucceeded(payload) {
  return {
    type: actions.loginSucceeded.type,
    payload,
  };
}

export function loginFailed() {
  return {
    type: actions.loginFailed.type,
  };
}
