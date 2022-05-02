import React, { FC } from 'react'
import './styles.scss'

interface NotificationsListProps {
  isEditingItem: boolean
  useInput: any
}

const NotificationsList: FC<NotificationsListProps> = ({ isEditingItem, useInput }) => {

  return (
    <div className='errors-list'>
      {
        isEditingItem && useInput.isTouched && useInput.isEmpty &&
        <span className="errors-list-message">{useInput.errors}</span>
      }
      {
        isEditingItem && useInput.isTouched && useInput.maxLengthError &&
        <span className="errors-list-message">{useInput.errors}</span>
      }
      {
        isEditingItem && useInput.isTouched && useInput.uniqueValueError &&
        <span className="errors-list-message">{useInput.errors}</span>
      }
    </div>
  );
};

export default NotificationsList;