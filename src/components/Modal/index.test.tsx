import Modal from './index';
import { render } from '@testing-library/react';

const ComponentForTest = () => {
  return (
    <h1>Render modal with component</h1>
  )
}

describe('Test for modal component', () => {

  it('Render modal without component', () => {
    const ModalWithoutComponent = render(<Modal active={false} setActive={function (bool: boolean): void {
      throw new Error('Function not implemented.');
    }} children={undefined} />)
    expect(ModalWithoutComponent).toMatchSnapshot();
  })

  it('Render modal with component', () => {
    const ModalWithComponent = render(<Modal active={true} setActive={function (bool: boolean): void {
      throw new Error('Function not implemented.');
    }} children={<ComponentForTest />} />)
    expect(ModalWithComponent).toMatchSnapshot();
  })

  it('Check has class active', () => {
    const { container } = render(<Modal active={true} setActive={function (bool: boolean): void {
      throw new Error('Function not implemented.');
    }} children={<ComponentForTest />} />)
    expect(container.firstChild).toHaveClass('active')
  })

  it('Close modal test', () => {
    let modalIsActive = true
    const closeModal = () => modalIsActive = false
    const { container } = render(
      <Modal active={modalIsActive} setActive={closeModal} children={<ComponentForTest />} />
    )
    expect(container.firstChild).not.toHaveClass('active')
  })
})