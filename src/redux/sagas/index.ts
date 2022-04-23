import { all, spawn } from 'redux-saga/effects';
import incomesSaga from './incomes';

export default function* rootSaga() {
  const sagas = [incomesSaga];

  yield all(sagas.map(s => spawn(s)));
}