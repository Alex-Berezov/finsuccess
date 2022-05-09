import React, { FC, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import { selectIncomes } from './../../redux/redusers/incomes/selectors'
import { selectExpenses } from './../../redux/redusers/expenses/selectors'
import useInput from './../../hooks/useInput';
import { IOperations } from '../../Types/Types';

import './styles.scss'
import { OperationsActionType } from '../../Types/OperationsTypes';

interface AddOperationFormProps {
  setActive: (bool: boolean) => void
}

const AddOperationForm: FC<AddOperationFormProps> = ({ setActive }) => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [selectValue, setSelectValue] = useState<string>('')
  const dispatch = useDispatch()

  const incomeData = useSelector(selectIncomes).incomes
  const expensesData = useSelector(selectExpenses).expenses

  const names = []
  for (let elem of [...incomeData, ...expensesData]) {
    names.push(elem.name)
  }

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value)
  }

  const amountInput = useInput('', { isEmpty: true })
  const commentInput = useInput('', { isEmpty: true, maxLength: 22 })

  const addOperation = (newOperation: IOperations) => dispatch({
    type: OperationsActionType.ADD_OPERATION,
    newOperation
  })

  const selectedDay = `${startDate.getDate() <= 9 ? `0${startDate.getDate()}` : startDate.getDate()}`
  const selectedMonth = `${startDate.getMonth() <= 8 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1}`
  const selectedYear = `${startDate.getFullYear()}`

  const handleSeveOperation = () => {
    addOperation(
      {
        id: uuidv4(),
        date: `${selectedDay}.${selectedMonth}.${selectedYear}`,
        value: +amountInput.value,
        itemName: selectValue,
        comment: commentInput.value
      }
    )
    amountInput.setValue('')
    commentInput.setValue('')
    setActive(false)
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
        <input
          type="text"
          value={amountInput.value}
          onChange={amountInput.onChange}
          onBlur={amountInput.onBlur}
        />
      </div>
      <div className="AddOperationForm__item">
        <p>Статья</p>
        <select value={selectValue} onChange={handleItemSelect}>
          {
            names?.map(name => <option key={name} value={name}>{name}</option>)
          }
        </select>
      </div>
      <div className="AddOperationForm__item">
        <p>Комментарий</p>
        <input
          type="text"
          value={commentInput.value}
          onChange={commentInput.onChange}
          onBlur={commentInput.onBlur}
        />
      </div>
      <button type='button' onClick={handleSeveOperation}>Сохранить</button>
    </div>
  );
};

export default AddOperationForm