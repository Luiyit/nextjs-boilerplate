import React from 'react'
import { useForm, SubmitHandler, FormProvider, FieldValues, Path, DeepPartial } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import Form from '@base_comps/form';
import useOnChange from '@core/hooks/use_on_change';

export type { FieldValues };

export type FormError = {
  [index: string]: string[]
}

interface ChildrenProps<InputData extends FieldValues> {
  methods: UseFormReturn<InputData>
  submit: () => Promise<void>
}

interface HookFormProps<InputData extends FieldValues> {
  children: (props: ChildrenProps<InputData>) => React.ReactNode,
  onSubmit: Function,
  error?: FormError,
  defaultValues?: DeepPartial<InputData>,
  action?: string
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | undefined
}

export default function HookForm<InputData extends FieldValues>({ children, onSubmit, error, defaultValues, action, method }: HookFormProps<InputData>){
  const methods = useForm<InputData>({ defaultValues });  
  const { handleSubmit } = methods;
  const internalOnSubmit: SubmitHandler<InputData> = (data, e) => onSubmit(data, methods, e);
  const submit = handleSubmit(internalOnSubmit);

  useOnChange(() => {
    if(!error) return
    
    const keys = Object.keys(error);
    if(!!keys.length){
      for (const key of keys) {
        // TODO: Set multiples errors. Watch: https://www.react-hook-form.com/api/useform/seterror/
        methods.setError(
          key as Path<InputData>, 
          { type: 'manual', message: error[key].join(', ') }
        )
      }
    }
  }, [error], true)

  return (
    <FormProvider {...methods}>
      <Form action={action} onSubmit={submit} method={method}>
        {(children as Function)({ methods, submit })}
      </Form>
    </FormProvider>
  )
}

