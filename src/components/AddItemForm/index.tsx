import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IBalance } from './../../Types/Types';
import useInput from './../../hooks/useInput';
import NotificationsList from './../NotificationsList/index';

import './styles.scss';

interface AddItemFormProps {
  addItem: (obj: IBalance) => void
  isAddingItem: boolean
  setIsAddingItem: (bool: boolean) => void
  tableData: Array<IBalance>
}

const AddItemForm: FC<AddItemFormProps> = ({ addItem, isAddingItem, setIsAddingItem, tableData }) => {
  const addItemInput = useInput('', { isEmpty: true, maxLength: 22, uniqueValue: tableData })

  const handleSentItem = () => {
    addItem({ id: uuidv4(), name: addItemInput.value, value: 0 })
    setIsAddingItem(false)
  }

  return (
    <>
      {
        isAddingItem
          ? (
            <form className="addItemForm">
              <div className="addItemForm__field-block">
                <input
                  className='addFormItemValue'
                  type="text"
                  autoFocus
                  value={addItemInput.value}
                  onChange={addItemInput.onChange}
                  onBlur={addItemInput.onBlur}
                />
                {
                  <NotificationsList isEditingItem={isAddingItem} useInput={addItemInput} />
                }
              </div>
              <button
                className={addItemInput.errors ? 'okBtn disabled' : 'okBtn'}
                onClick={handleSentItem}
                disabled={addItemInput.errors ? true : false}
              >
                Ok
              </button>
            </form>
          )
          : null
      }
    </>
  );
};

export default AddItemForm;