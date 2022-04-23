import React, { FC } from 'react';
import './styles.scss'

interface modalProps {
  active: boolean
  setActive: (bool: boolean) => void
  children: any
}

const Modal: FC<modalProps> = ({ active, setActive, children }) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;