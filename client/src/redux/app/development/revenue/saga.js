import { call, all, takeEvery, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import API_URL from '../../../../settings';
import actions from './actions';
import authHelper from '../../../../helpers/authHelper';

axios.defaults.baseURL = API_URL.apiUrl;

export function* getIncome() {
  yield takeEvery(actions.GET_INCOME_REQUEST, function*() {
    const params = {
      url: '/client/',
      method: 'get',
      headers: authHelper.customHeader(),
    };
    try {
      const res = yield call(axios.request, params);
      if (res.data) {
        yield put({
          type: actions.GET_INCOME_SUCCESS,
          payload: res.data,
        });
      }
    } catch (err) {
      yield put({
        type: actions.GET_INCOME_ERROR,
        err: err.response.data,
      });
    }
  });
}

export function* addIncome() {
  yield takeEvery(actions.ADD_INCOME_REQUEST, function*({ payload }) {
    const params = {
      url: '/client/create/',
      method: 'post',
      headers: authHelper.customHeader(),
      data: payload,
    };

    try {
      const res = yield call(axios.request, params);
      yield put({
        type: actions.ADD_INCOME_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      yield put({ type: actions.ADD_INCOME_ERROR });
    }
  });
}

export function* editIncome() {
  yield takeEvery(actions.EDIT_INCOME_REQUEST, function*({ payload }) {
    const params = {
      url: `/client/${payload.key}/`,
      method: 'put',
      headers: authHelper.customHeader(),
      data: payload,
    };

    try {
      const res = yield call(axios.request, params);
      yield put({
        type: actions.EDIT_INCOME_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      yield put({ type: actions.EDIT_INCOME_ERROR });
    }
  });
}

export function* deleteIncome() {
  yield takeEvery(actions.DELETE_INCOME_REQUEST, function*({ payload }) {
    const params = {
      url: `/client/${payload}/`,
      method: 'delete',
      headers: authHelper.customHeader()
    };

    try {
      const res = yield call(axios.request, params);
      if (res) {
        yield put({
          type: actions.DELETE_INCOME_SUCCESS,
          payload: res.status,
        });
      }
    } catch (err) {
      yield put({ type: actions.DELETE_INCOME_ERROR });
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(getIncome),
    fork(addIncome),
    fork(editIncome),
    fork(deleteIncome)
  ]);
}
