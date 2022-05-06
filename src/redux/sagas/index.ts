import { all, spawn } from 'redux-saga/effects';
import expensesSaga from './expenses';
import incomesSaga from './incomes';
import operationsSaga from './operations';

export default function* rootSaga() {
  const sagas = [incomesSaga, expensesSaga, operationsSaga];

  yield all(sagas.map(s => spawn(s)));
}