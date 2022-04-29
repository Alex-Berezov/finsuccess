import { AxiosResponse } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects'
import { ExpensesActionType } from '../../../Types/ExpensesTypes';
import { expensesAPI } from './../../../api/expensesAPI'
import { IBalance } from './../../../Types/Types';

interface AddExpenseTypes {
  newExpense: IBalance
  type: string
}

interface DeleteExpenseTypes {
  expenseId: string
  type: string
}

interface UpdateExpenseTypes {
  expenseId: string
  expenseName: string
  type: string
}

export function* FetchExpensesList() {
  try {
    const response: AxiosResponse<IBalance[]> = yield call(expensesAPI.getExpenses)
    yield put({ type: ExpensesActionType.EXPENSES_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: ExpensesActionType.EXPENSES_FAILURE, payload: error })
  }
}

export function* AddExpense(payload: AddExpenseTypes) {
  try {
    yield call(() => expensesAPI.postExpense({ ...payload.newExpense }))
    yield FetchExpensesList()
  } catch (error) {
    yield put({ type: ExpensesActionType.EXPENSES_FAILURE, payload: error })
  }
}

export function* DeleteExpense(payload: DeleteExpenseTypes) {
  try {
    yield call(() => expensesAPI.deleteExpense(payload.expenseId))
    yield FetchExpensesList()
  } catch (error) {
    yield put({ type: ExpensesActionType.EXPENSES_FAILURE, payload: error })
  }
}

export function* UpdateExpense(payload: UpdateExpenseTypes) {
  try {
    yield call(() => expensesAPI.updateExpense(payload.expenseId, payload.expenseName))
    yield FetchExpensesList()
  } catch (error) {
    yield put({ type: ExpensesActionType.EXPENSES_FAILURE, payload: error })
  }
}

export default function* ExpensesSaga() {
  yield takeEvery(ExpensesActionType.FETCH_EXPENSES, FetchExpensesList)
  yield takeEvery(ExpensesActionType.ADD_EXPENSE, AddExpense)
  yield takeEvery(ExpensesActionType.DELETE_EXPENSE, DeleteExpense)
  yield takeEvery(ExpensesActionType.UPDATE_EXPENSE, UpdateExpense)
}