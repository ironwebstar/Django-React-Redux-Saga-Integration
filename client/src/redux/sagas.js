import { all } from 'redux-saga/effects';
import revenueSagas from './app/development/revenue/saga';

export default function* rootSaga(getState) {
  yield all([
    revenueSagas()
  ]);
}
