import React, { useState } from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import { ComponentProps } from '@interfaces/util';

interface ModalProps extends AntdModalProps {
  handleOk: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, handleOk, handleCancel, ...rest } = props;
  
  return (
    <>
      <AntdModal
        onOk={handleOk}
        onCancel={handleCancel}
        {...rest}
      >
        { children }
      </AntdModal>
    </>
  )
}

export default Modal
