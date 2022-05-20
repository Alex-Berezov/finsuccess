import React from 'react';
import './styles.scss'

const Header = () => {
  return (
    <div className='header' data-testid="header">
      <p data-testid="logo">Logo</p>
      <div className="nav" data-testid="nav">
        <p>Item 1</p>
        <p>Item 1</p>
        <p>Item 1</p>
      </div>
    </div>
  );
};

export default Header;