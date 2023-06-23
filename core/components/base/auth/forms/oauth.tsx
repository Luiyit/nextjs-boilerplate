import { InputController } from '@base_comps/form';
import { Button } from 'antd';
import HookForm from '@base_comps/form/hook_form';
import { ReactComponentElement, useState } from 'react';
import { AuthProvidersType, BuiltInProviderType } from '@core/types/auth';
import { signIn } from "next-auth/react"
import Google from '@base_comps/icons/google'
import Text from '@core/components/styled/texts';
import { Flex } from '@core/components/styled/blocks';

interface ProviderData {
  icon: React.ReactNode
  color?: string
}

const providerIcons: { [key in string]: ProviderData } = {
  google: {
    icon: <Google size={20}/>
  },
}

interface Inputs {
  providerId: BuiltInProviderType
  csrfToken: string
}

interface Props {
  providers: Omit<AuthProvidersType, "credentials">
  signup?: boolean
}

const OAuthForms = ({ providers, signup }: Props) => {
  
  const [saving, setSaving] = useState<boolean>(false)
  
  const onSubmit = async (payload: Inputs) => {
    setSaving(true)
    
    const { providerId, csrfToken} = payload
    await signIn(providerId, {
      csrfToken,
      redirect: false,
    })
  };

  return (
    <>
      {Object.values(providers).map((provider) => {
        return (
          <HookForm<Inputs> key={provider.name} {...{ onSubmit }}>
            {() => (
              <>
                <InputController
                  type="hidden" 
                  name="providerId" 
                  defaultValue={provider.id} 
                />
                <Button
                  className='ant-btn-left-loading-icon'
                  key={provider.name}
                  htmlType="submit"
                  style={{marginBottom: '12px'}}
                  disabled={saving}
                  loading={saving}
                  size='large'
                  block
                >
                  <Flex alignItems="center" justifyContent="center">
                    { providerIcons[provider.id].icon }
                    <Text marginL="10px" as="span">
                      {signup ? "Sing up" : "Sign in"} with {provider.name}
                    </Text>
                  </Flex>
                </Button>
              </>
            )}
          </HookForm>
        )
      })}
    </>
  );
}

export default OAuthForms
