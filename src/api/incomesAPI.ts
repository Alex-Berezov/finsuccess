import { IBalance } from '../Types/Types';
import { instance } from './api';

export const incomesAPI = {
  getIncomes() {
    return instance.get<IBalance>('incomes').then(res => res.data)
  }
}