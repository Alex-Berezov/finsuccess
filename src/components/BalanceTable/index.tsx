import React, { FC } from 'react';
import { IBalance } from '../../Types/Types';

import './styles.scss'

interface BalanceTableProps {
  tableData: Array<IBalance>
  tableTitle: string
}

const BalanceTable: FC<BalanceTableProps> = ({ tableData, tableTitle }) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>{tableTitle}</th>
        </tr>
      </thead>
      <tbody>
        {
          tableData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            )
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <th>Итого:</th>
          <td>
            {
              tableData.reduce((sum, current) => {
                if (!current.value) {
                  return 0
                }
                return sum + current.value
              }, 0)
            }
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default BalanceTable;