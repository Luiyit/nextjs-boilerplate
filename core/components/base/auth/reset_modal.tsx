import React, { useEffect, useState } from 'react'
import { getProviders } from "next-auth/react"
import AuthResetCredentialsForm from './forms/forgot_password';
import { AuthProvidersType } from '@core/types/auth';
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
}

function Handler({ modalProps }: Props) {
  const [providers, setProviders] = useState<AuthProvidersType | null>(null)
  const { session, alreadySignedIn } = useSignin({ redirectTo: "/" })
  const { info } = useNotifier()

  useEffect(() => {
    (async () => {
      const providers = await getProviders()
      if(providers) setProviders(providers)
    })()
  }, [])

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

  if(!providers) return null
  const { credentials, ...rest } = providers

  return (
    <>
      <Div textAlign="center" marginB="20px">
        <Text as="h1">Forgot Password?</Text>
        <Text>Enter the email address associated with your account</Text>
      </Div>

      <AuthResetCredentialsForm 
        provider={credentials} 
        onError={localOnSuccess} 
        onSuccess={localOnSuccess}
      />
    </>
  )
}

const ResetModal = ({ renderLink, size }: Omit<Props, "modalProps">) => {
  
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
        <Handler modalProps={modalProps} />
      )}
    </ModalTrigger>
  )
}

export default ResetModal
