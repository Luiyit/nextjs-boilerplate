import { InputController, CheckboxController } from '@base_comps/form';
import { Button } from 'antd';
import HookForm from '@base_comps/form/hook_form';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AuthProvider } from '@core/types/auth';
import { signIn } from "next-auth/react"
import { authOptions } from '@api/auth/[...nextauth]'
import { Flex, Grid } from '@styled_comps/blocks';
import ResetModal from '../reset_modal'

interface Inputs {
  password: string
  passwordConfirmation: string
  email: string
}

interface Props {
  provider: AuthProvider
  onSuccess?: Function
  onError?: Function
  signup?: boolean
  showPasswordConfirmation?: boolean
}

/**
 * DEV NOTE:
 * Now this form only support input fields for credentials
 * that are defined in the next-auth config file
 */
const AuthCredentialsForm = ({ onSuccess, onError, provider, signup }: Props) => {
  
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<any>({})

  const credentialsProvider = authOptions.providers.find(cred => cred.id === provider.id)
  if(!credentialsProvider) return null;

  const onSubmit = async (payload: Inputs, methods: UseFormReturn<Inputs> ) => {
    setSaving(true)
    setError({})
    
    const response = await signIn(provider.id, {
      ...payload,
      redirect: false,
    })
    
    if(response?.ok) onSuccess && onSuccess(response)
    else onError && onError(response)

    setSaving(false)
  };

  const { credentials } = credentialsProvider.options as any
  if(Object.keys(credentials).length === 0) return null;

  return (
    <HookForm<Inputs> {...{ onSubmit, error }}>
      {({ methods }) => {
        const { formState: { isValid }} = methods

        return (
        <Grid gap="10px" gridTemplateColumns="repeat(1, 1fr)">
          {Object.keys(credentials).map((key, index) => {
            const { type, label, placeholder, rules } = credentials[key]
            return (
              <InputController
                key={index}
                name={key}
                type={type}
                label={label}
                placeholder={placeholder}
                rules={rules}
                defaultValue="test9@gmail.com"
              />
            )
          })}

          <Flex justifyContent="space-between" alignItems="center">
            <CheckboxController
              name="remember"
              label="Keep me logged in"
            />
            <ResetModal renderLink />
          </Flex>
          
          <Button
            htmlType="submit"
            type="primary"
            style={{marginTop: '12px'}}
            loading={saving}
            disabled={!isValid || saving}
            size='large'
            block
          >
            {signup ? "Sing up" : "Sign in"}
          </Button>
        </Grid>
      )}}
    </HookForm>
  );
}

export default AuthCredentialsForm
