import { all, spawn } from 'redux-saga/effects';
import expensesSaga from './expenses';
import incomesSaga from './incomes';

export default function* rootSaga() {
  const sagas = [incomesSaga, expensesSaga];

  yield all(sagas.map(s => spawn(s)));
}