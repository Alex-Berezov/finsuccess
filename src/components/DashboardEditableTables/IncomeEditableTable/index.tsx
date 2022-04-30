import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IncomesActionType } from '../../../Types/IncomesTypes';
import EditableBalanceTable from '../../EditableBalanceTable';
import { IBalance } from '../../../Types/Types';
import { selectIncomes } from '../../../redux/redusers/incomes/selectors';

const IncomeEditableTable: FC = () => {
  const dispatch = useDispatch()

  const incomeData = useSelector(selectIncomes).incomes

  const addIncome = (newIncome: IBalance) => dispatch({
    type: IncomesActionType.ADD_INCOME,
    newIncome: newIncome
  })

  const deleteIncome = (incomeId: string) => dispatch({
    type: IncomesActionType.DELETE_INCOME,
    incomeId
  })

  const updateIncome = (incomeId: string, incomeName: string) => dispatch({
    type: IncomesActionType.UPDATE_INCOME,
    incomeId,
    incomeName
  })

  return (
    <>
      <EditableBalanceTable
        tableData={incomeData}
        addItem={addIncome}
        deleteItem={deleteIncome}
        updateItem={updateIncome}
      />
    </>
  );
};

export default IncomeEditableTable;