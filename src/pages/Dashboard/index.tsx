import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IncomeEditableTable from '../../components/DashboardEditableTables/IncomeEditableTable';
import Modal from '../../components/Modal';
import { IncomesActionType } from '../../Types/IncomesTypes';
import BalanceTable from './../../components/BalanceTable/index';
import { action } from './../../redux/index';
import { selectIncomes } from './../../redux/redusers/incomes/selectors';
import ExpenseEditableTable from './../../components/DashboardEditableTables/ExpensesEditableTable/index';
import { selectExpenses } from './../../redux/redusers/expenses/selectors';
import { ExpensesActionType } from '../../Types/ExpensesTypes';
import { IBalance } from './../../Types/Types';

import './styles.scss'

const countArrayValues = (array: Array<IBalance>) => {
  return array.reduce((sum: number, current: IBalance) => sum + current.value, 0)
}

const Dashboard: FC = () => {
  const [incomeModalActive, setIncomeModalActive] = useState(false)
  const [expensesModalActive, setExpensesModalActive] = useState(false)

  useEffect(() => {
    action(IncomesActionType.FETCH_INCOMES)
    action(ExpensesActionType.FETCH_EXPENSES)
  }, [])

  const incomeData = useSelector(selectIncomes).incomes
  const expensesData = useSelector(selectExpenses).expenses

  const balanceData = [
    { id: 'balance-data-incomse', name: 'Доходы', value: countArrayValues(incomeData) },
    { id: 'balance-data-expenses', name: 'Расходы', value: -countArrayValues(expensesData) }
  ]

  return (
    <div className='dashboard'>
      <div className="balance__block">
        <div className="balance__block-item income">
          <BalanceTable tableData={incomeData} tableTitle='Доходы' />
          <button
            type='button'
            className='addItem'
            onClick={() => setIncomeModalActive(true)}
          >
            Редактировать
          </button>
        </div>
        <div className="balance__block-item expenses">
          <BalanceTable tableData={expensesData} tableTitle='Расходы' />
          <button
            type='button'
            className='addItem'
            onClick={() => setExpensesModalActive(true)}
          >
            Редактировать
          </button>
        </div>
        <div className="balance__block-item balance">
          <BalanceTable tableData={balanceData} tableTitle='Баланс' />
        </div>
      </div>
      <Modal active={incomeModalActive} setActive={setIncomeModalActive}>
        <IncomeEditableTable />
      </Modal>
      <Modal active={expensesModalActive} setActive={setExpensesModalActive}>
        <ExpenseEditableTable />
      </Modal>
    </div>
  );
};

export default Dashboard;