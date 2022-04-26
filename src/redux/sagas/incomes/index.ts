import axios, { AxiosResponse } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects'
import { IncomesActionType } from '../../../Types/IncomesTypes';
import { incomesAPI } from './../../../api/incomesAPI'
import { IBalance } from './../../../Types/Types';

export function* FetchIncomesList() {
  try {
    const response: AxiosResponse<IBalance[]> = yield call(incomesAPI.getIncomes)
    yield put({ type: IncomesActionType.INCOMES_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: IncomesActionType.INCOMES_FAILURE, payload: error })
  }
}

export function* AddIncome(payload: any) { //???????????????????
  try {
    yield call(() => incomesAPI.postIncome({ ...payload.newIncome }))
    yield FetchIncomesList()
  } catch (error) {
    yield put({ type: IncomesActionType.INCOMES_FAILURE, payload: error })
  }
}

export default function* incomesSaga() {
  yield takeEvery(IncomesActionType.FETCH_INCOMES, FetchIncomesList)
  yield takeEvery(IncomesActionType.ADD_INCOME, AddIncome)
}