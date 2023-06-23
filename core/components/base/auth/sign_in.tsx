import React from 'react'
import AuthCredentialsForm from './forms/credentials';
import { AuthProvidersType } from '@core/types/auth';
import OAuthForms from './forms/oauth';
import { Button, Divider } from 'antd';
import Text from '@core/components/styled/texts';
import { Div } from '@core/components/styled/blocks';

interface Props {
  providers: Omit<AuthProvidersType, "credentials">
  onError?: Function
  onSuccess?: Function
  setSignUp?: Function
  allowSignup?: boolean
}

const SignIn = ({ providers, onError, onSuccess, setSignUp, allowSignup }: Props) => {
  const { credentials, ...rest } = providers

  return (
    <>
      <Div textAlign="center" marginB="20px">
        <Text as="h1">Welcome!</Text>
        <Text>Sign in to your account</Text>
      </Div>
      
      <OAuthForms providers={rest} />
      <Divider>Or login with email</Divider>

      <AuthCredentialsForm provider={credentials} onError={onError} onSuccess={onSuccess}/>

      {allowSignup && setSignUp && (
        <>
          <Divider />
          <Div textAlign="center">
            <Text>Don&apos;t have an account?</Text>
            <Button type="link" onClick={() => setSignUp()}>Sign up</Button>
          </Div>
        </>
      )}
    </>
  )
}

export default SignIn
