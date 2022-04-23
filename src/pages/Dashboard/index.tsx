import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal';
import { IncomesActionType } from '../../Types/IncomesTypes';
import BalanceTable from './../../components/BalanceTable/index';
import { action } from './../../redux/index';
import { selectIncomes } from './../../redux/redusers/incomes/selectors';

import './styles.scss'

const Dashboard: FC = () => {
  const [incomeModalActive, setIncomeModalActive] = useState(false)
  const [expensesModalActive, setExpensesModalActive] = useState(false)
  const [assetsModalActive, setAssetsModalActive] = useState(false)
  const [liabilitiesModalActive, setLiabilitiesModalActive] = useState(false)

  useEffect(() => {
    action(IncomesActionType.FETCH_INCOMES)
  }, [])

  const incomeData = useSelector(selectIncomes).incomes

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
            Добавить доход
          </button>
        </div>
        <div className="balance__block-item expenses">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Расходы</th>
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
          <button
            type='button'
            className='addItem'
            onClick={() => setExpensesModalActive(true)}
          >
            Add item
          </button>
        </div>
        <div className="balance__block-item assets">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Активы</th>
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
          <button
            type='button'
            className='addItem'
            onClick={() => setAssetsModalActive(true)}
          >
            Add item
          </button>
        </div>
        <div className="balance__block-item liabilities">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Пассивы</th>
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
          <button
            type='button'
            className='addItem'
            onClick={() => setLiabilitiesModalActive(true)}
          >
            Add item
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
        First modal
      </Modal>
      <Modal active={expensesModalActive} setActive={setExpensesModalActive}>
        Second modal
      </Modal>
      <Modal active={assetsModalActive} setActive={setAssetsModalActive}>
        Third modal
      </Modal>
      <Modal active={liabilitiesModalActive} setActive={setLiabilitiesModalActive}>
        Fourth modal
      </Modal>
    </div>
  );
};

export default Dashboard;