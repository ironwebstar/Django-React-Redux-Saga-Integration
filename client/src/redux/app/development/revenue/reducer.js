import actions from './actions';

const initState = { income: [], err: null, deleteIncome: null, editedIncome: null};

export default function revenueReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_INCOME_SUCCESS:
      return { ...state, editedIncome: null, deleteIncome: null, income: action.payload, err: null };
    case actions.ADD_INCOME_SUCCESS:
      console.log('action payload state', state.income)
      console.log('action payload income', action.payload)
      state.income.push(action.payload)
      return { ...state, err: null};
    case actions.EDIT_INCOME_REQUEST:
      return { ...state, editedIncome: null, err: null };
    case actions.EDIT_INCOME_SUCCESS:
      return { ...state, editedIncome: action.payload, err: null};
    case actions.DELETE_INCOME_REQUEST:
      return { ...state, deleteIncome: null, err: null };
    case actions.DELETE_INCOME_SUCCESS:
      return { ...state, deleteIncome: action.payload, err: null};
    case actions.GET_INCOME_ERROR:
    case actions.ADD_INCOME_ERROR:
      return { ...state, editedIncome: null, deleteIncome: null, err: action.err };
    case actions.EDIT_INCOME_ERROR:
      return { ...state, editedIncome: null, err: action.err };
    case actions.DELETE_INCOME_ERROR:
      return { ...state, deleteIncome: null, err: action.err };
    default:
      return state;
  }
}
