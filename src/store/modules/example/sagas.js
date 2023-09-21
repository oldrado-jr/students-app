import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './example-slice';

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(request);
    toast.success('Sucesso!');
    yield put({
      type: actions.clickedButtonSucceeded.type,
    });
  } catch (error) {
    toast.error('Deu erro =(');
    yield put({
      type: actions.clickedButtonFailed.type,
    });
  }
}

export default all([
  takeLatest(actions.clickedButtonRequested.type, exampleRequest),
]);
