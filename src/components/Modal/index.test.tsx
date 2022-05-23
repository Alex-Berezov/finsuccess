import Modal from './index';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

const ComponentForTest = () => {
  return (
    <h1>Render modal with component</h1>
  )
}

describe('Test for modal component', () => {
  const toggleModal = jest.fn()

  it('Render modal without component', () => {
    const ModalWithoutComponent = render(
      <Modal active={false} setActive={toggleModal} children={undefined} />
    )
    expect(ModalWithoutComponent).toMatchSnapshot();
  })

  it('Render modal with component', () => {
    const ModalWithComponent = render(
      <Modal active={true} setActive={toggleModal} children={<ComponentForTest />} />
    )
    expect(ModalWithComponent).toMatchSnapshot();
  })

  it('Check has class active', () => {
    const { container } = render(
      <Modal active={true} setActive={toggleModal} children={<ComponentForTest />} />
    )
    expect(container.firstChild).toHaveClass('active')
  })

  it('Close modal test', () => {
    const { getByTestId, queryByTestId } = render(
      <Modal active={true} setActive={toggleModal} children={<ComponentForTest />} />
    )
    userEvent.click(getByTestId('modal'))
    expect(toggleModal).toHaveBeenCalledTimes(1)
    expect(queryByTestId('modal')).not.toHaveClass('active', { exact: true })
  })
})