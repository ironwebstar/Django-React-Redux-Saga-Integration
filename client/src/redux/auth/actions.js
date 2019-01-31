const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  USERINFO_GET_REQUEST: 'USERINFO_GET_REQUEST',
  USERINFO_GET_SUCCESS: 'USERINFO_GET_SUCCESS',
  USERINFO_GET_ERROR: 'USERINFO_GET_ERROR',
  USERINFO_UPDATE_REQUEST: 'USER_INFO_UPDATE_REQUEST',
  USERINFO_UPDATE_SUCCESS: 'USER_INFO_UPDATE_SUCCESS',
  USERINFO_UPDATE_FAIL: 'USER_INFO_UPDATE_FAIL',

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (userId, password) => ({
    type: actions.LOGIN_REQUEST,
    payload: { userId, password }
  }),
  signup: (userInfo) => ({
    type: actions.REGISTER_REQUEST,
    payload: userInfo
  }),
  logout: () => ({
    type: actions.LOGOUT_REQUEST
  }),
  getUserInfo: () => ({
    type: actions.USERINFO_GET_REQUEST,
  }),
  updateUserInfo: (userInfo) => ({
    type: actions.USERINFO_UPDATE_REQUEST,
    payload: userInfo
  })
};
export default actions;
