import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('With React Testing Library', () => {
  const initialState = { output: 10 }
  const mockStore = configureStore()
  let store, wrapper

  it('renders App', () => {
    store = mockStore(initialState)
    const {getByText} = render(<Provider store={store}><App /></Provider>)
    screen.debug()
    // expect(getByText('Hello Worldd!')).not.toBeNull()
  })
})
// test('renders App', () => {
  
//   render(<App />)
//   screen.debug()
//   const linkElement = screen.getByText(/Доходы/i);
//   expect(linkElement).toBeInTheDocument();
// });

