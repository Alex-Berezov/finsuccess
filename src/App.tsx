import React from 'react';
import './app.scss'
import Dashboard from './pages/Dashboard/index';
import Header from './components/Header/index';

function App() {
  return (
    <div className='app'>
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
