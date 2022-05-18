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
import { OperationsActionType } from '../../Types/OperationsTypes';
import OperationsBlock from './../../components/OperationsBlock/index';
import { countArrayValues } from './../../utils/index';

import './styles.scss'

const Dashboard: FC = () => {
  const [incomeModalActive, setIncomeModalActive] = useState(false)
  const [expensesModalActive, setExpensesModalActive] = useState(false)

  useEffect(() => {
    action(IncomesActionType.FETCH_INCOMES)
    action(ExpensesActionType.FETCH_EXPENSES)
    action(OperationsActionType.FETCH_OPERATIONS)
  }, [])

  const incomeData = useSelector(selectIncomes)?.incomes
  const expensesData = useSelector(selectExpenses)?.expenses

  const balanceData = [
    { id: 'balance-data-incomse', name: 'Доходы', value: countArrayValues(incomeData) },
    { id: 'balance-data-expenses', name: 'Расходы', value: -countArrayValues(expensesData) }
  ]

  return (
    <div className='dashboard' data-testid="dashboard">
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
      <OperationsBlock />
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