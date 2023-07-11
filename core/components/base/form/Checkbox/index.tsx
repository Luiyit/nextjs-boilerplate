import React from 'react';

import { Checkbox, CheckboxProps } from 'antd';
import Error from '../Error';
import Label from '../Label';
import { ControllerProps } from '../types';
import { CheckboxChangeEvent } from 'antd/es/checkbox';


export interface FieldProps extends ControllerProps, Omit<CheckboxProps, "name">{
}

export default function CheckboxControl({ fieldData, rules, ...props }: FieldProps) {

  const { field, fieldState } = fieldData;
  const { label, style, ...rest } = props;
  const { value, onChange, ...restField } = field;
  
  /**
   * DEV NOTE:
   * 
   * Antd change the base checkbox click event for a custom one
   * In this change, the type property inside target is removed
   * HookForm use it to validate the type and take the new state from target.checked instead target.value (like a normal input)
   * 
   * @param event Antd CheckboxChangeEvent
   */
  const onLocalChange = (event: CheckboxChangeEvent) => {
    onChange({ event, target: { ...event.target, type: 'checkbox' }})
  }

  return (
    <>
      <Label 
        name={field.name} 
        isRequired={rules?.hasOwnProperty('required')}
      >
        <Checkbox {...restField} {...rest} onChange={onLocalChange} checked={value}>
          {label}        
        </Checkbox>
      </Label>
      <Error message={fieldState?.error?.message} />
    </>
  );
};
