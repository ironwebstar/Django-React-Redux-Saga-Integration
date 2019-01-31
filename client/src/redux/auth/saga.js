import { call, all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import { getToken, clearToken } from '../../helpers/utility';
import API_URL from '../../settings';
import actions from './actions';
import authHelper from '../../helpers/authHelper';

axios.defaults.baseURL = API_URL.apiUrl;

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({ payload }) {
    const params = {
      url: '/auth/signin',
      method: 'post',
      headers: authHelper.customHeader(),
      data: payload,
    };
    try {
      const res = yield call(axios.request, params);
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: res.data.token,
        profile: res.data.user,
      });
    } catch (err) {
      yield put({ type: actions.LOGIN_ERROR, err: err.response.data });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
    yield put(push('/'));
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* registerRequest() {
  yield takeEvery(actions.REGISTER_REQUEST, function*({ payload }) {
    const params = {
      url: '/auth/signup',
      method: 'post',
      headers: authHelper.customHeader(),
      data: payload,
    };

    try {
      const res = yield call(axios.request, params);
      yield put({
        type: actions.REGISTER_SUCCESS,
        token: res.data.token,
        user: res.data.user,
      });
    } catch (err) {
      yield put({ type: actions.REGISTER_ERROR });
    }
  });
}

export function* registerSuccess() {
  yield takeEvery(actions.REGISTER_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
    yield put(push('/'));
  });
}

export function* registerError() {
  yield takeEvery(actions.REGISTER_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT_REQUEST, function*() {
    const params = {
      url: '/auth/signout',
      method: 'post',
      headers: authHelper.customHeader(),
    };
    try {
      yield call(axios.request, params);
      yield put({
        type: actions.LOGOUT_SUCCESS,
      });
    } catch (err) {
      yield put({
        type: actions.LOGOUT_ERROR,
        err,
      });
    }
  });
}

function* logoutSuccess() {
  yield takeEvery(actions.LOGOUT_SUCCESS, function*() {
    clearToken();
    yield put(push('/'));
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken();
    if (token) {
      yield put({
        type: actions.USERINFO_GET_REQUEST,
      });
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
      });
    }
  });
}

export function* getUserInfo() {
  yield takeEvery(actions.USERINFO_GET_REQUEST, function*() {
    const params = {
      url: '/auth/user',
      method: 'get',
      headers: authHelper.customHeader(),
    };
    try {
      const res = yield call(axios.request, params);
      if (res.data.success) {
        yield put({
          type: actions.USERINFO_GET_SUCCESS,
          user: res.data.user,
        });
      }
    } catch (err) {
      yield put({
        type: actions.USERINFO_GET_ERROR,
        err: err.response.data,
      });
    }
  });
}

export function* updateUserInfo() {
  yield takeEvery(actions.USERINFO_UPDATE_REQUEST, function*({ payload }) {
    const params = {
      url: '/auth/user',
      method: 'put',
      headers: authHelper.customHeader(),
      data: payload,
    };
    try {
      const res = yield call(axios.request, params);
      if (res.data.success)
      yield put({
        type: actions.USERINFO_UPDATE_SUCCESS,
        user: res.data.user,
      });
    } catch (err) {
      yield put({
        type: actions.USERINFO_UPDATE_ERROR,
        err: err.response.data,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
    fork(logoutSuccess),
    fork(registerRequest),
    fork(registerSuccess),
    fork(registerError),
    fork(getUserInfo),
    fork(updateUserInfo),
  ]);
}
