import { IBalance } from '../Types/Types';
import { instance } from './api';

export const incomesAPI = {
  getIncomes() {
    return instance.get<IBalance>('incomes').then(res => res.data)
  },
  postIncome(newIncome: IBalance) {
    return instance.post<IBalance[]>('incomes', newIncome)
  },
  deleteIncome(incomeId: string) {
    return instance.delete<IBalance[]>(`incomes/${incomeId}`)
  },
  updateIncome(incomeId: string, incomeName: string) {
    return instance.patch<IBalance[]>(`incomes/${incomeId}`, { "name": incomeName })
  },
  updateIncomeValue(incomeId: string, incomeValue: number) {
    return instance.patch<IBalance[]>(`incomes/${incomeId}`, { "value": incomeValue })
  }
}