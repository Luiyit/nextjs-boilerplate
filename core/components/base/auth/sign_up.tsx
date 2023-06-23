import React from 'react'
import { AuthProvidersType } from '@core/types/auth';
import OAuthForms from './forms/oauth';
import { Button, Divider } from 'antd';
import Text from '@core/components/styled/texts';
import { Div } from '@core/components/styled/blocks';

interface Props {
  providers: Omit<AuthProvidersType, "credentials">
  onError?: Function
  onSuccess?: Function
  setSignIn: Function
  form?: React.ComponentType<{ onSuccess: Function | undefined, onError: Function | undefined }>
}

const SignIn = ({ providers, onError, onSuccess, setSignIn, form }: Props) => {
  const { credentials, ...rest } = providers
  const FormComponent = form;

  return (
    <>
      <Div textAlign="center" marginB="20px">
        <Text as="h1">Sign up!</Text>
        <Text>Create an account</Text>
      </Div>
      <OAuthForms providers={rest} signup />

      {FormComponent && (
        <>
          <Divider>Or sign up with email</Divider>
          <FormComponent onSuccess={onSuccess} onError={onError} />
        </>
      )}

      <Divider />
      <Div textAlign="center">
        <Text>Already have an account</Text>
        <Button type="link" onClick={() => setSignIn()}>Sign in</Button>
      </Div>
    </>
  )
}

export default SignIn
