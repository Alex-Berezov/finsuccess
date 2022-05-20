import Header from './index';
import { render } from '@testing-library/react';

describe('Header tests', () => {
  const { getByTestId } = render(<Header />)
  it('Test Header is mounted', () => {
    expect(getByTestId('header')).toBeInTheDocument()
    expect(getByTestId('logo')).toBeInTheDocument()
    expect(getByTestId('nav')).toBeInTheDocument()
  })
})