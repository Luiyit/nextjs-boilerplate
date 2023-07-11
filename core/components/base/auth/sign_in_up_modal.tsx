import React, { useEffect, useState } from 'react'
import { SignInResponse, getProviders, signIn } from "next-auth/react"
import { AuthProvidersType } from '@core/types/auth';
import useSignin from './use_signin';
import ModalTrigger, { CallbackProps } from '@antd_comps/modal/trigger'
import { Button, ButtonProps } from 'antd';
import SignIn from './sign_in'
import SignUp from './sign_up'

export interface SignInUpModalProps {
  modalProps: CallbackProps
  renderLink?: boolean
  signupForm?: React.ComponentType<{ onSuccess: Function | undefined, onError: Function | undefined }>
  starMode?: "signin" | "signup"
  buttonProps?: ButtonProps
  buttonLabel?: React.ReactNode
  forgotPasswordForm?: React.ComponentType<{ onSuccess: Function | undefined, onError: Function | undefined }>
}

// TODO: Config if we want to sign in after sign up. If user need to confirm email, the login will fail
function Handler({ modalProps, signupForm, forgotPasswordForm, starMode='signin' }: SignInUpModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(starMode)
  
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

  function onSignInSuccess(response: SignInResponse) {
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

    if(response?.ok) onSignInSuccess(response)
    else onError(response)
  }

  if(!providers) return null
  

  return (
    <>
      {mode === "signin" && (
        <SignIn 
          providers={providers}
          onError={onError}
          onSuccess={onSignInSuccess}
          setSignUp={() => setMode("signup")}
          allowSignup={!!signupForm}
          forgotPasswordForm={forgotPasswordForm}
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

const SignInUpModal = ({ renderLink, buttonProps, buttonLabel= "Sign in", ...rest }: Omit<SignInUpModalProps, "modalProps">) => {
  
  const render = (cbProps: CallbackProps) => {
    return (
      <Button onClick={() => cbProps.setOpen(true)} {...buttonProps}>
        { buttonLabel }
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
