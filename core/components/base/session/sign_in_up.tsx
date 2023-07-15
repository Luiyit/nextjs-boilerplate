import React from 'react'
import { useSession } from '@core/providers/session'
import SignInUpModal, { SignInUpModalProps } from '@root/core/components/base/auth/auth_modal';

interface Props extends Omit<SignInUpModalProps, "modalProps"> {
}

const SignInUp = ({...rest }: Props) => {
  const { user } = useSession();
  if(user) return null;

  return (
    <SignInUpModal {...rest} />
  )
}

export default SignInUp
