import React from 'react';
import { Select, SelectProps } from 'antd';
import Label from '../Label';
import Error from '../Error';
import type { ControllerProps, Type } from '../types';
import { Country }  from 'country-state-city';

export interface OptionType { 
  key?: string; 
  label: React.ReactNode; 
  value: string | number;
  disabled?: boolean;
  title?: string;
}

export interface FieldProps extends ControllerProps, Omit<SelectProps<any, OptionType>, "defaultValue | options" >  {
  type?: Type;
}

export default function SelectControl({ fieldData, rules, ...props }: FieldProps) {
  const { field, fieldState } = fieldData;
  const { label, style, ...rest } = props;
  
  const options = Country.getAllCountries().map((country) => ({
    key: country.name,
    value: country.isoCode,
    label: country.name,
  }));

  return (
    <>
      {label && (
        <Label label={label} name={field.name} isRequired={rules?.hasOwnProperty('required')}/>
      )}

      <Select 
        {...field} 
        {...rest}
        options={options}
        showSearch
        style={{ width: '100%', ...style }}
      />
      <Error message={fieldState?.error?.message} />
    </>
  );
}
