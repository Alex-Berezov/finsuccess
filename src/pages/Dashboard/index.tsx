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

import './styles.scss'
import { ExpensesActionType } from '../../Types/ExpensesTypes';

const Dashboard: FC = () => {
  const [incomeModalActive, setIncomeModalActive] = useState(false)
  const [expensesModalActive, setExpensesModalActive] = useState(false)

  useEffect(() => {
    action(IncomesActionType.FETCH_INCOMES)
    action(ExpensesActionType.FETCH_EXPENSES)
  }, [])

  const incomeData = useSelector(selectIncomes).incomes
  const expensesData = useSelector(selectExpenses).expenses

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
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Баланс</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item name1</td>
                <td>Item value1</td>
              </tr>
              <tr>
                <td>Item name2</td>
                <td>Item value2</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>613</td>
              </tr>
            </tfoot>
          </table>
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