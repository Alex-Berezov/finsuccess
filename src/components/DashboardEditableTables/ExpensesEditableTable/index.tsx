import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableBalanceTable from '../../EditableBalanceTable';
import { IBalance } from '../../../Types/Types';
import { selectExpenses } from '../../../redux/redusers/expenses/selectors';
import { ExpensesActionType } from '../../../Types/ExpensesTypes';

const ExpenseEditableTable: FC = () => {
  const dispatch = useDispatch()

  const expensesData = useSelector(selectExpenses)?.expenses

  const addExpense = (newExpense: IBalance) => dispatch({
    type: ExpensesActionType?.ADD_EXPENSE,
    newExpense: newExpense
  })

  const deleteExpense = (expenseId: string) => dispatch({
    type: ExpensesActionType?.DELETE_EXPENSE,
    expenseId
  })

  const updateExpense = (expenseId: string, expenseName: string) => dispatch({
    type: ExpensesActionType?.UPDATE_EXPENSE,
    expenseId,
    expenseName
  })

  return (
    <>
      <EditableBalanceTable
        tableData={expensesData}
        addItem={addExpense}
        deleteItem={deleteExpense}
        updateItem={updateExpense}
      />
    </>
  );
};

export default ExpenseEditableTable;