import React, { FC, useId, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getFinFormat } from './../../utils/index'

import './styles.scss'
interface AddOperationFormProps {
  isUpdatingOperation: boolean
  itemNames: Array<string>
  startDate: Date
  setStartDate: (date: Date) => void
  amountInput: any
  commentInput: any
  handleAddOperation: () => void
  handleSeveOperation: () => void
  selectValue: string
  handleItemSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const AddOperationForm: FC<AddOperationFormProps> = (
  {
    isUpdatingOperation, itemNames, startDate, setStartDate, handleItemSelect,
    amountInput, commentInput, handleAddOperation, handleSeveOperation, selectValue
  }
) => {

  return (
    <div className='AddOperationForm'>
      <h3>{isUpdatingOperation ? 'Обновить операцию' : 'Новая операция'}</h3>
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
            itemNames?.map(name => <option key={name} value={name}>{name}</option>)
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
      {
        isUpdatingOperation
          ? <button type='button' onClick={handleSeveOperation}>Сохранить</button>
          : <button type='button' onClick={handleAddOperation}>Добавить</button>
      }
    </div>
  );
};

export default AddOperationForm