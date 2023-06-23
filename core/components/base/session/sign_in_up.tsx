import React from 'react'
import { useSession } from '@core/providers/session'
import SignInUpModal from '@base_comps/auth/sign_in_up_modal';

interface Props {
  signupForm: React.ComponentType<{ onSuccess: Function | undefined, onError: Function | undefined }>
}
const SignInUp = ({ signupForm }: Props) => {
  const { user } = useSession();
  if(user) return null;

  return (
    <SignInUpModal size="small" signupForm={signupForm} />
  )
}

export default SignInUp
