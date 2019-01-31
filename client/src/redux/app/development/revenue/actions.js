const actions = {
  GET_INCOME_REQUEST: 'GET_INCOME_REQUEST',
  GET_INCOME_SUCCESS: 'GET_INCOME_SUCCESS',
  GET_INCOME_ERROR: 'GET_INCOME_ERROR',
  ADD_INCOME_REQUEST: 'ADD_INCOME_REQUEST',
  ADD_INCOME_SUCCESS: 'ADD_INCOME_SUCCESS',
  ADD_INCOME_ERROR: 'ADD_INCOME_ERROR',
  DELETE_INCOME_REQUEST: 'DELETE_INCOME_REQUEST',
  DELETE_INCOME_SUCCESS: 'DELETE_INCOME_SUCCESS',
  DELETE_INCOME_ERROR: 'DELETE_INCOME_ERROR',
  EDIT_INCOME_REQUEST: 'EDIT_INCOME_REQUEST',
  EDIT_INCOME_SUCCESS: 'EDIT_INCOME_SUCCESS',
  EDIT_INCOME_ERROR: 'EDIT_INCOME_ERROR',

  getIncome: () => ({
    type: actions.GET_INCOME_REQUEST 
  }),
  addIncome: (incomeInfo) => ({
    type: actions.ADD_INCOME_REQUEST,
    payload: incomeInfo
  }),
  deleteIncome: (key) => ({
    type: actions.DELETE_INCOME_REQUEST,
    payload: key
  }),
  editIncome: (editInfo) => ({
    type: actions.EDIT_INCOME_REQUEST,
    payload: editInfo
  })
};
export default actions;
