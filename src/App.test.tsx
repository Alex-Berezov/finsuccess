/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './redux/redusers/index'
import { Action, AnyAction, createStore, Store } from 'redux';

const initialState: any = {}

interface RenderWithRedux<
  S = any,
  A extends Action = AnyAction,
  I extends S = any
  > {
  (
    ui: ReactNode,
    reduxOptions: {
      store?: Store<S, A>
      initialState?: I
    }
  ): RenderResult & {
    store: Store<S, A>
  }
}
export const renderWithRedux: RenderWithRedux = (
  ui,
  { store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

describe('With React Testing Library', () => {

  it('renders App', () => {
    const { getByTestId } = renderWithRedux(<App />, {})
    screen.debug()
    expect(getByTestId('header')).toBeInTheDocument()
    expect(getByTestId('dashboard')).toBeInTheDocument()
  })
})

