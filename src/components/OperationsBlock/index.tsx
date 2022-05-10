import React, { FC, useState } from 'react'
import { IOperations } from '../../Types/Types'
import { getFinFormat } from './../../utils/index'
import Modal from './../Modal/index'
import AddOperationForm from './../AddOperationForm/index'
import { useDispatch, useSelector } from 'react-redux'
import { selectIncomes } from './../../redux/redusers/incomes/selectors'
import { selectExpenses } from './../../redux/redusers/expenses/selectors'
import { OperationsActionType } from '../../Types/OperationsTypes'
import { v4 as uuidv4 } from 'uuid'
import useInput from './../../hooks/useInput'


import garbage from '../../assets/img/garbage.svg'
import './styles.scss'

interface OperationsBlockProps {
  tableData: Array<IOperations>
}

const OperationsBlock: FC<OperationsBlockProps> = ({ tableData }) => {
  const [addOperationModalActive, setAddOperationModalActive] = useState<boolean>(false)
  const [isUpdatingOperation, setIsUpdatingOperation] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [selectValue, setSelectValue] = useState<string>('')
  const dispatch = useDispatch()

  const incomeData = useSelector(selectIncomes).incomes
  const expensesData = useSelector(selectExpenses).expenses

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

  const hendleDeleteOperation = (e: React.MouseEvent<HTMLImageElement>, operationId: string) => {
    e.stopPropagation()
    deleteOperation(operationId)
  }

  const amountInput = useInput('', { isEmpty: true })
  const commentInput = useInput('', { isEmpty: true, maxLength: 22 })

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
    setAddOperationModalActive(false)
  }

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
    const selectedOperation = tableData.filter(elem => elem.id === operationId)[0]
    amountInput.setValue(`${selectedOperation.value}`)
    commentInput.setValue(`${selectedOperation.comment}`)
    const selectedDate = selectedOperation.date.split('.').reverse().join('-')
    setStartDate(new Date(selectedDate))
    setSelectValue(selectedOperation.itemName)
    setAddOperationModalActive(true)
  }

  return (
    <div className='operations__block'>
      <button
        className='operations__block-addOperationBtn'
        onClick={() => handleAddingOperation()}
      >
        Добавить операцию
      </button>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Статья</th>
            <th colSpan={2}>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData.map((item) => {
              return (
                <tr key={item.id} onClick={() => handleSelectedOperation(item.id)}>
                  <td>{item.date}</td>
                  <td>{getFinFormat(item.value)}</td>
                  <td>{item.itemName}</td>
                  <td>{item.comment}</td>
                  <td className='operations__block-delete'>
                    <img src={garbage} alt="Delete" onClick={(e) => hendleDeleteOperation(e, item.id)} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Modal active={addOperationModalActive} setActive={setAddOperationModalActive}>
        <AddOperationForm
          isUpdatingOperation={isUpdatingOperation}
          itemNames={itemNames}
          startDate={startDate}
          setStartDate={setStartDate}
          amountInput={amountInput}
          commentInput={commentInput}
          handleSeveOperation={handleSeveOperation}
          selectValue={selectValue}
          handleItemSelect={handleItemSelect}
        />
      </Modal>
    </div>
  );
};

export default OperationsBlock;