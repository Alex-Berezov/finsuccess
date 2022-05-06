import { IOperations } from "./Types"

export interface OperationsState {
  operations: Array<IOperations>
  loading: boolean
  error: null | string
}

export enum OperationsActionType {
  FETCH_OPERATIONS = 'FETCH_OPERATIONS',
  ADD_OPERATION = 'ADD_OPERATION',
  DELETE_OPERATION = 'DELETE_OPERATION',
  UPDATE_OPERATION = 'UPDATE_OPERATION',
  OPERATIONS_SUCCESS = 'OPERATIONS_SUCCESS',
  OPERATIONS_FAILURE = 'OPERATIONS_FAILURE'
}

interface FetchOperationsAction {
  type: OperationsActionType.FETCH_OPERATIONS
}

interface AddOperationAction {
  type: OperationsActionType.ADD_OPERATION,
  payload: IOperations
}

interface DeleteOperationAction {
  type: OperationsActionType.DELETE_OPERATION,
  paylod: string
}

interface UpdateOperationAction {
  type: OperationsActionType.UPDATE_OPERATION,
  payload: string
}

interface OperationsSuccessAction {
  type: OperationsActionType.OPERATIONS_SUCCESS,
  payload: Array<IOperations>
}

interface OperationsFailureAction {
  type: OperationsActionType.OPERATIONS_FAILURE
  payload: string
}

export type OperationsAction =
  FetchOperationsAction
  | AddOperationAction
  | DeleteOperationAction
  | UpdateOperationAction
  | OperationsSuccessAction
  | OperationsFailureAction