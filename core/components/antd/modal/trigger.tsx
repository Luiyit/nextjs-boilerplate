import React, { useState } from 'react'
import { Button, ModalProps } from 'antd';
import Modal from '.'

export interface CallbackProps {
  open?: boolean,
  confirmLoading?: boolean,
  setOpen: Function,
  setConfirmLoading: Function,
  openCounter: number,
  setOpenCounter: Function,
}

type NewModalProps = Omit<ModalProps, "children">;

interface TriggerProps extends NewModalProps {
  children: (params: CallbackProps) => React.ReactNode
  render?: (params: CallbackProps) => React.ReactNode
  text?: string
  open?: boolean
  confirmLoading?: boolean
  handleOk?: Function
  handleCancel?: Function
}

const Trigger: React.FC<TriggerProps> = (props) => {
  const {open, confirmLoading, handleOk, handleCancel, ...rest } = props;
  const [openCounter, setOpenCounter] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(!!confirmLoading);
  
  const childrenProps = {
    open: isOpen,
    confirmLoading: isConfirmLoading,
    setOpen: setIsOpen,
    setConfirmLoading: setIsConfirmLoading,
    openCounter,
    setOpenCounter,
  }

  const internalHandleOk = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleOk && handleOk(childrenProps, event);
  };

  const internalHandleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleCancel && handleCancel(childrenProps, event);
  };

  const modalProps = {
    open: isOpen,
    confirmLoading: isConfirmLoading,
    handleOk: internalHandleOk,
    handleCancel: internalHandleCancel,
  }

  // const childrenWithProps = React.isValidElement(props.children) ?
  //   React.cloneElement(props.children, { modalProps: childrenProps }) :
  //   props.children;
  // render ( { childrenWithProps } )

  const openModal = () => {
    setOpenCounter(openCounter + 1);
    setIsOpen(true)
  }

  const { render } = props;
  
  return (
    <>
      {/* Modal trigger  */}
      {typeof render === 'function' && render(childrenProps)}
      {!render && <Button type="primary" onClick={openModal}>{ props.text || 'Open modal' }</Button>}

      {/* Modal */}
      <Modal destroyOnClose { ...modalProps} {...rest}>
        { props.children(childrenProps as CallbackProps) }
      </Modal>
    </>
  )
}

export default Trigger
