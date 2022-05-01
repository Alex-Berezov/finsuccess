import React, { FC, useState } from 'react';
import penil from '../../assets/img/pencil.svg';
import garbage from '../../assets/img/garbage.svg';
import useInput from './../../hooks/useInput';
import { IBalance } from './../../Types/Types';
import AddItemForm from './../AddItemForm/index';

import './styles.scss'

interface EditableBalanceTableProps {
  tableData: Array<IBalance>
  addItem: (obj: IBalance) => void
  deleteItem: (id: string) => void
  updateItem: (incomeId: string, incomeName: string) => void
}

const EditableBalanceTable: FC<EditableBalanceTableProps> = ({ tableData, addItem, deleteItem, updateItem }) => {
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false)
  const [isEditingItem, setIsEditingItem] = useState<boolean>(false)
  const [selectedForEditItem, setSelectedForEditItem] = useState<string>('')

  const editItemInput = useInput('', { isEmpty: true, minLength: 2, maxLength: 22, uniqueTask: tableData })

  const handleDeleteItem = (id: string) => {
    deleteItem(id)
  }

  const handleEditingItem = (id: string, value: string) => {
    setSelectedForEditItem(id)
    editItemInput.setValue(value)
    setIsEditingItem(true)
  }

  const handleSentEditedItem = () => {
    updateItem(selectedForEditItem, editItemInput.value)
    setIsEditingItem(false)
  }

  return (
    <>
      <h2>Редактировать статьи</h2>
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
                          value={editItemInput.value}
                          onChange={editItemInput.onChange}
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
                        onClick={handleSentEditedItem}
                      >
                        Ok
                      </button>
                      : (
                        <>
                          <img
                            src={penil}
                            alt="penil"
                            onClick={() => handleEditingItem(item.id, item.name)}
                          />
                          <img
                            src={garbage}
                            alt="garbage"
                            onClick={() => handleDeleteItem(item.id)}
                          />
                        </>
                      )
                  }
                </div>
              </div>
            )
          })
        }
        <AddItemForm addItem={addItem} isAddingItem={isAddingItem} setIsAddingItem={setIsAddingItem} />
      </div>
      <button
        className='addItemButton'
        onClick={() => setIsAddingItem(true)}
      >
        Добавить статью
      </button>
    </>
  );
};

export default EditableBalanceTable;