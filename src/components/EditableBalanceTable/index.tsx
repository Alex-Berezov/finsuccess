import React, { FC } from 'react';
import { IBalance } from '../../Types/Types';

import './styles.scss'

interface EditableBalanceTableProps {
  tableData: Array<IBalance>
  tableTitle: string
}

const EditableBalanceTable: FC<EditableBalanceTableProps> = ({ tableData, tableTitle }) => {
  return (
    <>
      <h2>Редактировать статьи доходов</h2>
      <div className="editableTable">
        <div className="editableTable__block">
          <div className="editableTable__block-item">
            <p>Some</p>
            <p>120000</p>
          </div>
          <div className="editableTable__block-edits">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
      <table>
        <tbody>
          {
            tableData.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                  </tr>
                  <button>Edit</button>
                </>
              )
            })
          }
        </tbody>
      </table>
      <button>Добавить статью доходов</button>
    </>
  );
};

export default EditableBalanceTable;