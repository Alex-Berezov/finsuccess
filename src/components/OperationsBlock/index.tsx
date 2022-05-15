import React, { FC, useState } from 'react'
import { IOperations } from '../../Types/Types'
import { byField } from './../../utils/index'
import Modal from './../Modal/index'
import AddOperationForm from './../AddOperationForm/index'
import { useDispatch, useSelector } from 'react-redux'
import { selectIncomes } from './../../redux/redusers/incomes/selectors'
import { selectExpenses } from './../../redux/redusers/expenses/selectors'
import { OperationsActionType } from '../../Types/OperationsTypes'
import { v4 as uuidv4 } from 'uuid'
import useInput from './../../hooks/useInput'
import { selectOperations } from './../../redux/redusers/operations/selectors'
import OperationBlockTable from './../OperationBlockTable/index'

import './styles.scss'

const OperationsBlock: FC = () => {
  const [addOperationModalActive, setAddOperationModalActive] = useState<boolean>(false)
  const [isUpdatingOperation, setIsUpdatingOperation] = useState<boolean>(false)
  const [updatingOperationId, setUpdatingOperationId] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [selectValue, setSelectValue] = useState<string>('')
  const dispatch = useDispatch()

  const incomeData = useSelector(selectIncomes).incomes
  const expensesData = useSelector(selectExpenses).expenses
  const operationsData = useSelector(selectOperations).operations.sort(byField('date'))

  const itemNames: Array<string> = ['Выберете статью']
  for (let elem of [...incomeData, ...expensesData]) {
    itemNames.push(elem.name)
  }

  const addOperation = (newOperation: IOperations) => dispatch({
    type: OperationsActionType.ADD_OPERATION,
    newOperation
  })

  const deleteOperation = (operationId: string) => dispatch({
    type: OperationsActionType.DELETE_OPERATION,
    operationId
  })

  const updateOperation = (operationId: string, editedOperation: IOperations) => dispatch({
    type: OperationsActionType.UPDATE_OPERATION,
    operationId,
    editedOperation
  })

  const hendleDeleteOperation = (e: React.MouseEvent<HTMLImageElement>, operationId: string) => {
    e.stopPropagation()
    deleteOperation(operationId)
  }

  const amountInput = useInput('', { isEmpty: true })
  const commentInput = useInput('', { maxLength: 42 })

  const selectedDay = `${startDate.getDate() <= 9 ? `0${startDate.getDate()}` : startDate.getDate()}`
  const selectedMonth = `${startDate.getMonth() <= 8 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1}`
  const selectedYear = `${startDate.getFullYear()}`

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value)
  }

  const handleAddingOperation = () => {
    setIsUpdatingOperation(false)
    amountInput.setValue('')
    commentInput.setValue('')
    setStartDate(new Date())
    setSelectValue(`${itemNames[0]}`)
    setAddOperationModalActive(true)
  }

  const handleSelectedOperation = (operationId: string) => {
    setIsUpdatingOperation(true)
    const selectedOperation = operationsData.filter((elem: IOperations) => elem.id === operationId)[0]
    amountInput.setValue(`${selectedOperation.value}`)
    commentInput.setValue(`${selectedOperation.comment}`)
    const selectedDate = selectedOperation.date.split('.').reverse().join('-')
    setStartDate(new Date(selectedDate))
    setSelectValue(selectedOperation.itemName)
    setAddOperationModalActive(true)
    setUpdatingOperationId(operationId)
  }

  const handleAddOperation = () => {
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
    setAddOperationModalActive(false)
  }

  const handleSeveOperation = () => {
    updateOperation(
      updatingOperationId,
      {
        id: updatingOperationId,
        date: `${selectedDay}.${selectedMonth}.${selectedYear}`,
        value: +amountInput.value,
        itemName: selectValue,
        comment: commentInput.value
      }
    )
    setAddOperationModalActive(false)
  }

  return (
    <div className='operations__block'>
      <button
        className='operations__block-addOperationBtn'
        onClick={() => handleAddingOperation()}
      >
        Добавить операцию
      </button>
      <OperationBlockTable
        operationsData={operationsData}
        handleSelectedOperation={handleSelectedOperation}
        hendleDeleteOperation={hendleDeleteOperation}
      />
      <Modal active={addOperationModalActive} setActive={setAddOperationModalActive}>
        <AddOperationForm
          addOperationModalActive={addOperationModalActive}
          isUpdatingOperation={isUpdatingOperation}
          itemNames={itemNames}
          startDate={startDate}
          setStartDate={setStartDate}
          amountInput={amountInput}
          commentInput={commentInput}
          handleAddOperation={handleAddOperation}
          selectValue={selectValue}
          handleItemSelect={handleItemSelect}
          handleSeveOperation={handleSeveOperation}
        />
      </Modal>
    </div>
  );
};

export default OperationsBlock;