import React, { FC, useState } from 'react';
import { IBalance } from '../../Types/Types';
import penil from '../../assets/img/pencil.svg';
import garbage from '../../assets/img/garbage.svg';
import { Formik, Form, Field } from 'formik';
import { IncomesActionType } from '../../Types/IncomesTypes';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss'
import useInput from './../../hooks/useInput';

interface EditableBalanceTableProps {
  tableData: Array<IBalance>
}

interface addIncomeValues {
  incomesItem: string;
}

const EditableBalanceTable: FC<EditableBalanceTableProps> = ({ tableData }) => {
  const [isAddingIncome, setIsAddingIncome] = useState<boolean>(false)
  const [isEditingItem, setIsEditingItem] = useState<boolean>(false)
  const [selectedForEditItem, setSelectedForEditItem] = useState<string>('')
  const dispatch = useDispatch()

  const editIncomeItem = useInput('')

  const initialValues: addIncomeValues = { incomesItem: '' };

  const addIncome = (newIncome: IBalance) => dispatch({
    type: IncomesActionType.ADD_INCOME,
    newIncome: newIncome
  })

  const deleteIncome = (incomeId: string) => dispatch({
    type: IncomesActionType.DELETE_INCOME,
    incomeId: incomeId
  })

  const updateIncome = (incomeId: string, incomeName: string) => dispatch({
    type: IncomesActionType.UPDATE_INCOME,
    incomeId,
    incomeName
  })

  const handleDeleteIncomeItem = (id: string) => {
    deleteIncome(id)
  }

  const handleEditingIncomeItem = (id: string, value: string) => {
    setSelectedForEditItem(id)
    editIncomeItem.setValue(value)
    setIsEditingItem(true)
  }

  const handleSentEditedIncomeItem = () => {
    updateIncome(selectedForEditItem, editIncomeItem.value)
    setIsEditingItem(false)
  }

  return (
    <>
      <h2>Редактировать статьи доходов</h2>
      <div className="editableTable">
        {
          tableData.map((item) => {
            return (
              <div className="editableTable__block" key={item.id}>
                <div className="editableTable__block-item">
                  {
                    isEditingItem && selectedForEditItem === item.id
                      ? (
                        <input
                          type="text"
                          autoFocus
                          value={editIncomeItem.value}
                          onChange={editIncomeItem.onChange}
                        />
                      )
                      : <p>{item.name}</p>
                  }
                  <p>{item.value}</p>
                </div>
                <div className="editableTable__block-edits">
                  {
                    isEditingItem && selectedForEditItem === item.id
                      ? <button
                        className='okBtn'
                        onClick={handleSentEditedIncomeItem}
                      >
                        Ok
                      </button>
                      : (
                        <>
                          <img
                            src={penil}
                            alt="penil"
                            onClick={() => handleEditingIncomeItem(item.id, item.name)}
                          />
                          <img
                            src={garbage}
                            alt="garbage"
                            onClick={() => handleDeleteIncomeItem(item.id)}
                          />
                        </>
                      )
                  }
                </div>
              </div>
            )
          })
        }
        {
          isAddingIncome
            ? (
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(false);
                  addIncome({ id: uuidv4(), name: values.incomesItem, value: 0 })
                  setIsAddingIncome(false);
                }}
              >
                <Form className='addIncomesForm'>
                  <Field id="incomesItem" name="incomesItem" placeholder="Статья доходов" />
                  <button className='okBtn' type="submit">Ok</button>
                </Form>
              </Formik>
            )
            : null
        }
      </div>
      <button
        className='addIncomesItem'
        onClick={() => setIsAddingIncome(true)}
      >
        Добавить статью доходов
      </button>
    </>
  );
};

export default EditableBalanceTable;