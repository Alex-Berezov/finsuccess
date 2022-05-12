import { IBalance } from '../Types/Types';
import { instance } from './api';

export const expensesAPI = {
  getExpenses() {
    return instance.get<IBalance>('expenses').then(res => res.data)
  },
  postExpense(newExpense: IBalance) {
    return instance.post<IBalance[]>('expenses', newExpense)
  },
  deleteExpense(expenseId: string) {
    return instance.delete<IBalance[]>(`expenses/${expenseId}`)
  },
  updateExpense(expenseId: string, expenseName: string) {
    return instance.patch<IBalance[]>(`expenses/${expenseId}`, { "name": expenseName })
  },
  updateExpenseValue(expenseId: string, expenseValue: number) {
    return instance.patch<IBalance[]>(`expenses/${expenseId}`, { "value": expenseValue })
  }
}