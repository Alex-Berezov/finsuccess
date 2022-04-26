import { IBalance } from "./Types"

export interface IncomesState {
  incomes: Array<IBalance>
  loading: boolean
  error: null | string
}

export enum IncomesActionType {
  FETCH_INCOMES = 'FETCH_INCOMES',
  ADD_INCOME = 'ADD_INCOME',
  INCOMES_SUCCESS = 'INCOMES_SUCCESS',
  INCOMES_FAILURE = 'INCOMES_FAILURE'
}

interface FetchIncomesAction {
  type: IncomesActionType.FETCH_INCOMES
}

interface AddIncomeAction {
  type: IncomesActionType.ADD_INCOME,
  payload: IBalance
}

interface IncomesSuccessAction {
  type: IncomesActionType.INCOMES_SUCCESS,
  payload: Array<IBalance>
}

interface IncomesFailureAction {
  type: IncomesActionType.INCOMES_FAILURE
  payload: string
}

export type IncomesAction =
  FetchIncomesAction
  | AddIncomeAction
  | IncomesSuccessAction
  | IncomesFailureAction