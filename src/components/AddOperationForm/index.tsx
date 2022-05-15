import React, { FC, useId, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getFinFormat } from './../../utils/index'
import NotificationsList from './../NotificationsList/index'


import './styles.scss'
interface AddOperationFormProps {
  addOperationModalActive: boolean
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
    addOperationModalActive, isUpdatingOperation, itemNames, startDate, setStartDate, handleItemSelect,
    amountInput, commentInput, handleAddOperation, handleSeveOperation, selectValue
  }
) => {
  console.log('====================================');
  console.log('amountInput >>', amountInput);
  console.log('====================================');

  console.log('====================================');
  console.log('amountInput >>', amountInput.value);
  console.log('====================================');

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
        {
          <NotificationsList isEditingItem={addOperationModalActive} useInput={amountInput} />
        }
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
          ? (<button
            disabled={!amountInput.value && amountInput.errors ? true : false}
            onClick={handleSeveOperation}
          >
            Сохранить
          </button>)
          : (<button
            disabled={!amountInput.value && amountInput.errors ? true : false}
            onClick={handleAddOperation}
          >
            Добавить
          </button>)
      }
    </div>
  );
};

export default AddOperationForm