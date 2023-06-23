import React, { useEffect, useState } from 'react'
import { SignInResponse, getProviders, signIn } from "next-auth/react"
import { AuthProvidersType } from '@core/types/auth';
import useSignin from './use_signin';
import ModalTrigger, { CallbackProps } from '@antd_comps/modal/trigger'
import { Button } from 'antd';
import SignIn from './sign_in'
import SignUp from './sign_up'

interface Props {
  modalProps: CallbackProps
  renderLink?: boolean
  size?: 'small' | 'middle' | 'large'
  signupForm?: React.ComponentType<{ onSuccess: Function | undefined, onError: Function | undefined }>
}

function Handler({ modalProps, signupForm }: Props) {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  
  const [providers, setProviders] = useState<AuthProvidersType | null>(null)
  const { session, onError, onSuccess, alreadySignedIn } = useSignin({ redirectTo: "/" })
  
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

  function localOnSuccess(response: SignInResponse) {
    onSuccess(response, false)
    modalProps.setOpen(false)
  }

  async function onSignupSuccess(payload: any) {
    const { credentials } = providers || {}
    if(!credentials) return null

    const response = await signIn(credentials.id, {
      ...payload,
      redirect: false,
    })

    if(response?.ok) localOnSuccess(response)
    else onError(response)
  }

  if(!providers) return null
  

  return (
    <>
      {mode === "signin" && (
        <SignIn 
          providers={providers}
          onError={onError}
          onSuccess={localOnSuccess}
          setSignUp={() => setMode("signup")}
          allowSignup={!!signupForm}
        />
      )}

      {mode === "signup" && (
        <SignUp 
          providers={providers}
          onError={onError}
          onSuccess={onSignupSuccess}
          setSignIn={() => setMode("signin")}
          form={signupForm}
        />
      )}

      
    </>
  )
}

const SignInUpModal = ({ renderLink, size, ...rest }: Omit<Props, "modalProps">) => {
  
  const render = (cbProps: CallbackProps) => {
    return (
      <Button type={renderLink ? "link": "primary"} onClick={() => cbProps.setOpen(true)} size={size}>
        Sign in
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
      width="500px" 
      footer={null}
    >
      {(modalProps) => (
        <Handler modalProps={modalProps} {...rest} />
      )}
    </ModalTrigger>
  )
}

export default SignInUpModal
