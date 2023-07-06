import React from 'react'
import { useSession } from '@core/providers/session'
import SignInUpModal, { SignInUpModalProps } from '@base_comps/auth/sign_in_up_modal';

interface Props extends Omit<SignInUpModalProps, "modalProps"> {
  signupForm: React.ComponentType<{ onSuccess: Function | undefined, onError: Function | undefined }>
}
const SignInUp = ({ signupForm, ...rest }: Props) => {
  const { user } = useSession();
  if(user) return null;

  return (
    <SignInUpModal signupForm={signupForm} {...rest} />
  )
}

export default SignInUp
