import React, { FC } from 'react'
import { IOperations } from '../../Types/Types'
import { getFinFormat } from './../../utils/index'

import garbage from '../../assets/img/garbage.svg'
import './styles.scss'

interface OperationBlockTableProps {
  operationsData: Array<IOperations>
  handleSelectedOperation: (id: string) => void
  hendleDeleteOperation: (e: React.MouseEvent<HTMLImageElement>, operationId: string) => void
}

const OperationBlockTable: FC<OperationBlockTableProps> = (
  { operationsData, handleSelectedOperation, hendleDeleteOperation }
) => {
  return (
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
          operationsData.map((item: IOperations) => {
            return (
              <tr key={item.id} onClick={() => handleSelectedOperation(item.id)}>
                <td>{item.date}</td>
                <td>{getFinFormat(item.value)}</td>
                <td>{item.itemName}</td>
                <td>{item.comment}</td>
                <td className='delete'>
                  <img src={garbage} alt="Delete" onClick={(e) => hendleDeleteOperation(e, item.id)} />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};

export default OperationBlockTable;