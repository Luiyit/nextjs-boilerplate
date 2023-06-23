import { InputController, CheckboxController } from '@base_comps/form';
import { Button } from 'antd';
import HookForm from '@base_comps/form/hook_form';
import { useState } from 'react';
import { DeepPartial, UseFormReturn } from 'react-hook-form';
import { AuthProvider } from '@core/types/auth';
import { signIn } from "next-auth/react"
import { authOptions } from '@api/auth/[...nextauth]'
import { Div, Flex, Grid } from '@styled_comps/blocks';

interface Inputs {
  email: string
}

interface Props {
  onSuccess?: Function
  onError?: Function
  provider: AuthProvider
  label?: string
}

/**
 * DEV NOTE:
 * Now this form only support input fields for credentials
 * that are defined in the next-auth config file
 */
const AuthResetCredentialsForm = ({ onSuccess, onError, provider, label}: Props) => {
  
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<any>({})

  const credentialsProvider = authOptions.providers.find(cred => cred.id === provider.id)
  if(!credentialsProvider) return null;

  const onSubmit = async (payload: Inputs, methods: UseFormReturn<Inputs> ) => {

    setSaving(true)
    setError({})
    
    // TODO: make request to the server
    const response = { ok: true, status: 200 }
    
    const { reset } = methods;
    reset();

    if(response?.ok) onSuccess && onSuccess(response)
    else onError && onError(response)

    setSaving(false)
  };

  const { credentials } = credentialsProvider.options as any
  if(Object.keys(credentials).length === 0) return null;

  return (
    <HookForm<Inputs> {...{ onSubmit, error }}>
      {({ submit, methods: { formState: { isValid } } }) => (
        <Grid gap="10px" gridTemplateColumns="repeat(1, 1fr)">
          <InputController
            name="email"
            type="email"
            label={label}
            placeholder="Enter your email address"
            rules={{ required: 'Email address is required' }}
          />
          
          {/* 
            * DEV NOTE
            * The type can not be submit because it could be inside another form
            * and it will trigger the submit event of the parent form
            */}
          <Button
            onClick={submit}
            type="primary"
            style={{marginTop: '12px'}}
            loading={saving}
            disabled={!isValid || saving}
            size='large'
            block
          >
            Reset Password
          </Button>
        </Grid>
      )}
    </HookForm>
  );
}

export default AuthResetCredentialsForm
