import React from 'react';

import { Checkbox, CheckboxProps } from 'antd';
import Error from '../Error';
import Label from '../Label';
import { ControllerProps } from '../types';


export interface FieldProps extends ControllerProps, Omit<CheckboxProps, "name">{
}

export default function CheckboxControl({ fieldData, rules, ...props }: FieldProps) {

  const { field, fieldState } = fieldData;
  const { label, style, ...rest } = props;
  const { value, restField } = field;

  return (
    <>
      <Label 
        name={field.name} 
        isRequired={rules?.hasOwnProperty('required')}
      >
        <Checkbox checked={value} {...restField} {...rest} >
          {label}        
        </Checkbox>
      </Label>
      <Error message={fieldState?.error?.message} />
    </>
  );
};
