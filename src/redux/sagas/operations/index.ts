import { IOperations } from "../../../Types/Types"
import { AxiosResponse } from 'axios';
import { operationsAPI } from "../../../api/operationsAPI";
import { call, put, takeEvery } from 'redux-saga/effects';
import { OperationsActionType } from "../../../Types/OperationsTypes";


interface AddOperationTypes {
  newOperation: IOperations
  type: string
}

interface DeleteOperationTypes {
  operationId: string
  type: string
}

interface UpdateOperationTypes {
  operationId: string
  editedOperation: IOperations
  type: string
}

export function* FetchOperationsList() {
  try {
    const response: AxiosResponse<IOperations[]> = yield call(operationsAPI.getOperations)
    yield put({ type: OperationsActionType.OPERATIONS_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: OperationsActionType.OPERATIONS_FAILURE, payload: error })
  }
}

export function* AddOperation(payload: AddOperationTypes) {
  try {
    yield call(() => operationsAPI.postOperation({ ...payload.newOperation }))
    yield FetchOperationsList()
  } catch (error) {
    yield put({ type: OperationsActionType.OPERATIONS_FAILURE, payload: error })
  }
}

export function* DeleteOperation(payload: DeleteOperationTypes) {
  try {
    yield call(() => operationsAPI.deleteOperation(payload.operationId))
    yield FetchOperationsList()
  } catch (error) {
    yield put({ type: OperationsActionType.OPERATIONS_FAILURE, payload: error })
  }
}

export function* UpdateOperation(payload: UpdateOperationTypes) {
  try {
    yield call(() => operationsAPI.updateOperation(payload.operationId, payload.editedOperation))
    yield FetchOperationsList()
  } catch (error) {
    yield put({ type: OperationsActionType.OPERATIONS_FAILURE, payload: error })
  }
}

export default function* operationsSaga() {
  yield takeEvery(OperationsActionType.FETCH_OPERATIONS, FetchOperationsList)
  yield takeEvery(OperationsActionType.ADD_OPERATION, AddOperation)
  yield takeEvery(OperationsActionType.DELETE_OPERATION, DeleteOperation)
  yield takeEvery(OperationsActionType.UPDATE_OPERATION, UpdateOperation)
}