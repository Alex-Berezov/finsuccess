import { call, takeEvery } from 'redux-saga/effects'
import { incomesAPI } from './../../../api/incomesAPI';
import { IBalance, IOperations } from './../../../Types/Types';
import { AxiosResponse } from 'axios';
import { expensesAPI } from './../../../api/expensesAPI';
import { OperationsActionType } from '../../../Types/OperationsTypes';
import { UpdateIncomeValue } from '../incomes';
import { UpdateExpenseValue } from '../expenses';
import { operationsAPI } from './../../../api/operationsAPI';

interface AddOperationBalanceRecalculationTypes {
  newOperation: IOperations
  type: string
}

interface DeleteOperationBalanceRecalculationTypes {
  operationId: string
  type: string
}

interface UpdateOperationBalanceRecalculationTypes {
  operationId: string
  editedOperation: IOperations
  type: string
}

function* GetDataForRecalculation() {
  try {
    const incomesResponse: AxiosResponse<IBalance[]> = yield call(incomesAPI.getIncomes)
    const expensesResponse: AxiosResponse<IBalance[]> = yield call(expensesAPI.getExpenses)
    const incomesArray: IBalance[] = Object.values(incomesResponse)
    const expensesArray: IBalance[] = Object.values(expensesResponse)

    const operationsResponse: AxiosResponse<IOperations[]> = yield call(operationsAPI.getOperations)
    const operationsArray: IOperations[] = Object.values(operationsResponse)

    return [incomesArray, expensesArray, operationsArray]
  } catch (error) {
    console.log(error)
  }
}

export function* AddOperationBalanceRecalculation(payload: AddOperationBalanceRecalculationTypes) {
  try {
    const [incomesArray, expensesArray]: Array<any> = yield GetDataForRecalculation()

    const newOperation: IOperations = { ...payload.newOperation }
    let operationId: string = ''
    let newValue: number = 0

    for (let item of incomesArray) {
      if (newOperation.itemName === item.name) {
        operationId = item.id
        newValue = item.value + newOperation.value
        yield UpdateIncomeValue(operationId, newValue)
      }
    }

    for (let item of expensesArray) {
      if (item.name === newOperation.itemName) {
        operationId = item.id
        newValue = item.value + newOperation.value
        yield UpdateExpenseValue(operationId, newValue)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export function* DeleteOperationBalanceRecalculation(payload: DeleteOperationBalanceRecalculationTypes) {
  try {
    const [incomesArray, expensesArray, operationsArray]: Array<any> = yield GetDataForRecalculation()
    const deletedOperation = operationsArray.filter((item: IOperations) => item.id === payload.operationId)[0]
    let newValue: number = 0

    for (let item of incomesArray) {
      if (item.name === deletedOperation.itemName) {
        newValue = item.value - deletedOperation.value
        yield UpdateIncomeValue(item.id, newValue)
      }
    }

    for (let item of expensesArray) {
      if (item.name === deletedOperation.itemName) {
        newValue = item.value - deletedOperation.value
        yield UpdateExpenseValue(item.id, newValue)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export function* UpdateOperationBalanceRecalculation(payload: UpdateOperationBalanceRecalculationTypes) {
  try {
    const deletePayload = { operationId: payload.operationId, type: OperationsActionType.DELETE_OPERATION }
    const addPayload = { newOperation: payload.editedOperation, type: OperationsActionType.ADD_OPERATION }

    yield DeleteOperationBalanceRecalculation(deletePayload)
    yield AddOperationBalanceRecalculation(addPayload)
  } catch (error) {
    console.log(error)
  }
}

export default function* balanceRecalculationSaga() {
  yield takeEvery(OperationsActionType.ADD_OPERATION, AddOperationBalanceRecalculation)
  yield takeEvery(OperationsActionType.DELETE_OPERATION, DeleteOperationBalanceRecalculation)
  yield takeEvery(OperationsActionType.UPDATE_OPERATION, UpdateOperationBalanceRecalculation)
}