import React, { FC, useState } from 'react';
import { IBalance } from '../../Types/Types';
import penil from '../../assets/img/pencil.svg';
import garbage from '../../assets/img/garbage.svg';
import { Formik, Form, Field } from 'formik';
import { IncomesActionType } from '../../Types/IncomesTypes';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss'

interface EditableBalanceTableProps {
  tableData: Array<IBalance>
  tableTitle: string
}

interface addIncomeValues {
  incomesItem: string;
}

const EditableBalanceTable: FC<EditableBalanceTableProps> = ({ tableData, tableTitle }) => {
  const [isAddingIncome, setIsAddingIncome] = useState(false)
  const dispatch = useDispatch()

  const addIncome = (newIncome: IBalance) => dispatch({
    type: IncomesActionType.ADD_INCOME,
    newIncome: newIncome
  })

  const initialValues: addIncomeValues = { incomesItem: '' };

  return (
    <>
      <h2>Редактировать статьи доходов</h2>
      <div className="editableTable">
        {
          tableData.map((item) => {
            return (
              <div className="editableTable__block" key={item.id}>
                <div className="editableTable__block-item">
                  <p>{item.name}</p>
                  <p>{item.value}</p>
                </div>
                <div className="editableTable__block-edits">
                  <img src={penil} alt="penil" />
                  <img src={garbage} alt="garbage" />
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
                  <button className='addIncomesBtn' type="submit">Ok</button>
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