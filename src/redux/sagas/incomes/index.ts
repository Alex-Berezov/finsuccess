import { AxiosResponse } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects'
import { IncomesActionType } from '../../../Types/IncomesTypes';
import { incomesAPI } from './../../../api/incomesAPI'
import { IBalance } from './../../../Types/Types';

interface AddIncomeTypes {
  newIncome: IBalance
  type: string
}

interface DeleteIncomeTypes {
  incomeId: string
  type: string
}

interface UpdateIncomeTypes {
  incomeId: string
  incomeName: string
  type: string
}

export function* FetchIncomesList() {
  try {
    const response: AxiosResponse<IBalance[]> = yield call(incomesAPI.getIncomes)
    yield put({ type: IncomesActionType.INCOMES_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: IncomesActionType.INCOMES_FAILURE, payload: error })
  }
}

export function* AddIncome(payload: AddIncomeTypes) {
  try {
    yield call(() => incomesAPI.postIncome({ ...payload.newIncome }))
    yield FetchIncomesList()
  } catch (error) {
    yield put({ type: IncomesActionType.INCOMES_FAILURE, payload: error })
  }
}

export function* DeleteIncome(payload: DeleteIncomeTypes) {
  try {
    yield call(() => incomesAPI.deleteIncome(payload.incomeId))
    yield FetchIncomesList()
  } catch (error) {
    yield put({ type: IncomesActionType.INCOMES_FAILURE, payload: error })
  }
}

export function* UpdateIncome(payload: UpdateIncomeTypes) {
  try {
    yield call(() => incomesAPI.updateIncome(payload.incomeId, payload.incomeName))
    yield FetchIncomesList()
  } catch (error) {
    yield put({ type: IncomesActionType.INCOMES_FAILURE, payload: error })
  }
}

export function* UpdateIncomeValue(incomeId: string, incomeValue: number) {
  try {
    yield call(() => incomesAPI.updateIncomeValue(incomeId, incomeValue))
    yield FetchIncomesList()
  } catch (error) {
    yield put({ type: IncomesActionType.INCOMES_FAILURE, payload: error })
  }
}

export default function* incomesSaga() {
  yield takeEvery(IncomesActionType.FETCH_INCOMES, FetchIncomesList)
  yield takeEvery(IncomesActionType.ADD_INCOME, AddIncome)
  yield takeEvery(IncomesActionType.DELETE_INCOME, DeleteIncome)
  yield takeEvery(IncomesActionType.UPDATE_INCOME, UpdateIncome)
}