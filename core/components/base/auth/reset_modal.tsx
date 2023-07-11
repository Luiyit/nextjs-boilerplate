import React, { useEffect } from 'react'
import useSignin from './use_signin';
import ModalTrigger, { CallbackProps } from '@antd_comps/modal/trigger'
import { Button } from 'antd';
import Text from '@core/components/styled/texts';
import { Div } from '@core/components/styled/blocks';
import { useNotifier } from '@core/providers/notifier';

interface Props {
  modalProps: CallbackProps
  renderLink?: boolean
  size?: 'small' | 'middle' | 'large' | undefined
  form?: React.ComponentType<{ onSuccess: Function | undefined, onError: Function | undefined }>
}

function Handler({ modalProps, form }: Props) {
  
  const { session, alreadySignedIn } = useSignin({ redirectTo: "/" })
  const { info } = useNotifier()
  const FormComponent = form

  useEffect(() => {
    if (session.data && session.status === "authenticated"){ 
      alreadySignedIn(false)
      modalProps.setOpen(false)
    }
  }, [modalProps, alreadySignedIn, session])

  function localOnSuccess() {
    info("Success", "If the email address you entered is associated with an account, you should receive an email shortly")
    modalProps.setOpen(false)
  }  

  if(!FormComponent) return null

  return (
    <>
      <Div textAlign="center" marginB="20px">
        <Text as="h1">Forgot Password?</Text>
        <Text>Enter the email address associated with your account</Text>
      </Div>

      <FormComponent 
        onError={localOnSuccess} 
        onSuccess={localOnSuccess}
      />
    </>
  )
}

const ResetModal = ({ renderLink, size, ...rest }: Omit<Props, "modalProps">) => {
  
  const render = (cbProps: CallbackProps) => {
    return (
      <Button type={renderLink ? "link": "primary"} onClick={() => cbProps.setOpen(true)} size={size}>
        Forgot your password?
      </Button>
    )
  }

  const handleCancel = ({ setOpen }: CallbackProps) => {
    setOpen(false);
  }

  const handleOk = ({ setConfirmLoading }: CallbackProps) => {
    setConfirmLoading(true);
  }

  return (
    <ModalTrigger 
      render={render} 
      handleCancel={handleCancel} 
      handleOk={handleOk} 
      width="600px" 
      footer={null}
    >
      {(modalProps) => (
        <Handler modalProps={modalProps} {...rest} />
      )}
    </ModalTrigger>
  )
}

export default ResetModal
