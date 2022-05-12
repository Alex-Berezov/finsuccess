import { call, takeEvery } from 'redux-saga/effects'
import { incomesAPI } from './../../../api/incomesAPI';
import { IBalance, IOperations } from './../../../Types/Types';
import { AxiosResponse } from 'axios';
import { expensesAPI } from './../../../api/expensesAPI';
import { OperationsActionType } from '../../../Types/OperationsTypes';
import { UpdateIncomeValue } from '../incomes';
import { UpdateExpenseValue } from '../expenses';

interface BalanceRecalculationTypes {
  newOperation: IOperations
  type: string
}

export function* BalanceRecalculation(payload: BalanceRecalculationTypes) {
  try {
    const incomesResponse: AxiosResponse<IBalance[]> = yield call(incomesAPI.getIncomes)
    const expensesResponse: AxiosResponse<IBalance[]> = yield call(expensesAPI.getExpenses)
    const newOperation = { ...payload.newOperation }
    const incomesArray = Object.values(incomesResponse)
    const expensesArray = Object.values(expensesResponse)
    let operatinId = ''
    let newValue = 0

    for (let item of incomesArray) {
      if (item.name === newOperation.itemName) {
        operatinId = item.id
        newValue = item.value + newOperation.value
      }
    }

    for (let item of expensesArray) {
      if (item.name === newOperation.itemName) {
        operatinId = item.id
        newValue = item.value + newOperation.value
      }
    }

    console.log('====================================');
    console.log('operatinId >>', operatinId);
    console.log('====================================');

    console.log('====================================');
    console.log('newValue >>', newValue);
    console.log('====================================');

    yield UpdateIncomeValue(operatinId, newValue)
    yield UpdateExpenseValue(operatinId, newValue)
  } catch (error) {
    console.log(error)
  }
}

export default function* balanceRecalculationSaga() {
  yield takeEvery(OperationsActionType.ADD_OPERATION, BalanceRecalculation)
}