import React, { FC, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useSelector } from 'react-redux'
import { selectIncomes } from './../../redux/redusers/incomes/selectors'
import { selectExpenses } from './../../redux/redusers/expenses/selectors'

import './styles.scss'

const AddOperationForm: FC = () => {
  const [startDate, setStartDate] = useState(new Date())

  const incomeData = useSelector(selectIncomes).incomes
  const expensesData = useSelector(selectExpenses).expenses

  const names = []
  for (let elem of [...incomeData, ...expensesData]) {
    names.push(elem.name)
  }

  return (
    <div className='AddOperationForm'>
      <h3>Новая операция</h3>
      <div className="AddOperationForm__item">
        <p>Дата</p>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
      <div className="AddOperationForm__item">
        <p>Сумма</p>
        <input type="text" />
      </div>
      <div className="AddOperationForm__item">
        <p>Статья</p>
        <select>
          {
            names?.map(name => <option key={name} value={name}>{name}</option>)
          }
        </select>
      </div>
      <div className="AddOperationForm__item">
        <p>Комментарий</p>
        <textarea rows={2} />
      </div>
      <button>Сохранить</button>
    </div>
  );
};

export default AddOperationForm