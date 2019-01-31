import actions from './actions';

const initState = { idToken: null, user: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, idToken: action.token, user: action.user };
    case actions.LOGIN_ERROR:
      return { ...state, err: action.err };
    case actions.LOGOUT_SUCCESS:
      return initState;
    case actions.LOGOUT_ERROR:
      return { ...state, err: action.err };
    case actions.USERINFO_GET_SUCCESS:
    case actions.USERINFO_UPDATE_SUCCESS:
      return { ...state, user: action.user, err: null };
    case actions.USERINFO_GET_ERROR:
    case actions.USERINFO_UPDATE_ERROR:
      return { ...state, err: action.err };
    default:
      return state;
  }
}
