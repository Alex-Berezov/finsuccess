import { IBalance } from "./Types"

export interface ExpensesState {
  expenses: Array<IBalance>
  loading: boolean
  error: null | string
}

export enum ExpensesActionType {
  FETCH_EXPENSES = 'FETCH_EXPENSES',
  ADD_EXPENSE = 'ADD_EXPENSE',
  DELETE_EXPENSE = 'DELETE_EXPENSE',
  UPDATE_EXPENSE = 'UPDATE_EXPENSE',
  EXPENSES_SUCCESS = 'EXPENSES_SUCCESS',
  EXPENSES_FAILURE = 'EXPENSES_FAILURE'
}

interface FetchExpensesAction {
  type: ExpensesActionType.FETCH_EXPENSES
}

interface AddExpenseAction {
  type: ExpensesActionType.ADD_EXPENSE,
  payload: IBalance
}

interface DeleteExpenseAction {
  type: ExpensesActionType.DELETE_EXPENSE,
  paylod: string
}

interface UpdateExpenseAction {
  type: ExpensesActionType.UPDATE_EXPENSE,
  payload: string
}

interface ExpensesSuccessAction {
  type: ExpensesActionType.EXPENSES_SUCCESS,
  payload: Array<IBalance>
}

interface ExpensesFailureAction {
  type: ExpensesActionType.EXPENSES_FAILURE
  payload: string
}

export type ExpensesAction =
  FetchExpensesAction
  | AddExpenseAction
  | DeleteExpenseAction
  | UpdateExpenseAction
  | ExpensesSuccessAction
  | ExpensesFailureAction