import React, { FC } from 'react';
import { IOperations } from '../../Types/Types';

import './styles.scss'
import { getFinFormat } from './../../utils/index';

interface OperationsBlockProps {
  tableData: Array<IOperations>
}

const OperationsBlock: FC<OperationsBlockProps> = ({ tableData }) => {
  return (
    <div className='operations__block'>
      <button className='addOperationBtn'>Добавить операцию</button>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Статья</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.date.replace(/\//g, '.')}</td>
                  <td>{getFinFormat(item.value)}</td>
                  <td>{item.itemName}</td>
                  <td>{item.comment}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default OperationsBlock;