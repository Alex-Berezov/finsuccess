import React, { FC, useEffect, useState } from 'react';
import penil from '../../assets/img/pencil.svg';
import garbage from '../../assets/img/garbage.svg';
import useInput from './../../hooks/useInput';
import { IBalance } from './../../Types/Types';
import AddItemForm from './../AddItemForm/index';

import './styles.scss'
import NotificationsList from './../NotificationsList/index';

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

  const editItemInput = useInput('', { isEmpty: true, maxLength: 22, uniqueValue: tableData })

  const handleDeleteItem = (id: string) => {
    deleteItem(id)
  }

  const handleEditingItem = (id: string, value: string) => {
    editItemInput.setErrors('')
    setSelectedForEditItem(id)
    setIsEditingItem(true)
    editItemInput.setValue(value)
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
                  <div className="editableTable__block-item-field">
                    {
                      isEditingItem && selectedForEditItem === item.id
                        ? (
                          <input
                            type="text"
                            autoFocus
                            value={editItemInput.value}
                            onChange={editItemInput.onChange}
                            onBlur={editItemInput.onBlur}
                          />
                        )
                        : <p onClick={() => handleEditingItem(item.id, item.name)} >{item.name}</p>
                    }
                    <p>{item.value}</p>
                  </div>
                  <div className="editableTable__block-item-edits">
                    {
                      isEditingItem && selectedForEditItem === item.id
                        ? <button
                          className={editItemInput.errors ? 'okBtn disabled' : 'okBtn'}
                          onClick={handleSentEditedItem}
                          disabled={editItemInput.errors ? true : false}
                        >
                          Ok
                        </button>
                        : (
                          <img
                            src={garbage}
                            alt="garbage"
                            onClick={() => handleDeleteItem(item.id)}
                          />
                        )
                    }
                  </div>
                </div>
                <div className="editableTable__block-errors">
                  {
                    selectedForEditItem === item.id
                      ? <NotificationsList isEditingItem={isEditingItem} useInput={editItemInput} />
                      : null
                  }
                </div>
              </div>
            )
          })
        }
        <AddItemForm
          addItem={addItem}
          isAddingItem={isAddingItem}
          setIsAddingItem={setIsAddingItem}
          tableData={tableData}
        />
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