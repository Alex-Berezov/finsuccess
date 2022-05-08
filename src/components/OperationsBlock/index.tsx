import React, { FC, useState } from 'react';
import { IOperations } from '../../Types/Types';
import { getFinFormat } from './../../utils/index';
import Modal from './../Modal/index';
import AddOperationForm from './../AddOperationForm/index';

import './styles.scss'

interface OperationsBlockProps {
  tableData: Array<IOperations>
}

const OperationsBlock: FC<OperationsBlockProps> = ({ tableData }) => {
  const [addOperationModalActive, setAddOperationModalActive] = useState<boolean>(false)

  return (
    <div className='operations__block'>
      <button
        className='addOperationBtn'
        onClick={() => setAddOperationModalActive(true)}
      >
        Добавить операцию
      </button>
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
                  <td>{item.date}</td>
                  <td>{getFinFormat(item.value)}</td>
                  <td>{item.itemName}</td>
                  <td>{item.comment}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Modal active={addOperationModalActive} setActive={setAddOperationModalActive}>
        <AddOperationForm />
      </Modal>
    </div>
  );
};

export default OperationsBlock;