import React, { useEffect, useState } from 'react'
import { SignInResponse, getProviders, signIn } from "next-auth/react"
import { AuthProvidersType } from '@core/types/auth';
import useSignin from './use_signin';
import ModalTrigger, { CallbackProps } from '@antd_comps/modal/trigger'
import { Button, ButtonProps } from 'antd';
import SignIn from './sign_in_wrapper'
import SignUp from './sign_up_wrapper'
import { useCoreConfig } from '@core/providers/config'

export interface SignInUpModalProps {
  modalProps: CallbackProps
  startMode?: "signin" | "signup"
  buttonProps?: ButtonProps
}

// TODO: Config if we want to sign in after sign up. If user need to confirm email, the login will fail
function Handler({ modalProps, startMode='signin' }: SignInUpModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(startMode)
  const [providers, setProviders] = useState<AuthProvidersType | null>(null)
  const { session, onError, onSuccess, alreadySignedIn } = useSignin({ redirectTo: "/" })
  const { auth } = useCoreConfig()
    
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

    if(response?.ok){
      if(auth.signInAfterCredentialsSignUp) onSignInSuccess(response)
      else setMode('signin')
    }else onError(response)
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
          allowSignup={auth.enabledSignUp}
          forgotPasswordForm={auth.forgotPasswordForm}
          signUpLabel={auth.signUpText}
        />
      )}

      {mode === "signup" && (
        <SignUp 
          providers={providers}
          onError={onError}
          onSuccess={onSignupSuccess}
          setSignIn={() => setMode("signin")}
          form={auth.signUpForm}
          signInLabel={auth.signInText}
        />
      )}
    </>
  )
}

const SignInUpModal = ({ buttonProps, startMode='signin', ...rest }: Omit<SignInUpModalProps, "modalProps">) => {
  const { auth } = useCoreConfig()
  
  const render = (cbProps: CallbackProps) => {
    return (
      <Button onClick={() => cbProps.setOpen(true)} {...buttonProps}>
        {startMode === 'signin' ? auth.signInText :  auth.signUpText }
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
