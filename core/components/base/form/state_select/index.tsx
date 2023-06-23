import React, { useEffect, useMemo } from 'react';
import { Select, SelectProps } from 'antd';
import Label from '../Label';
import Error from '../Error';
import type { ControllerProps, Type } from '../types';
import { State }  from 'country-state-city';
import { useFormContext } from 'react-hook-form';

export interface OptionType { 
  key?: string; 
  label: React.ReactNode; 
  value: string | number;
  disabled?: boolean;
  title?: string;
}

export interface FieldProps extends ControllerProps, Omit<SelectProps<any, OptionType>, "defaultValue | options" >  {
  countryCode?: string;
  type?: Type;
}

export default function SelectControl({ fieldData, rules, countryCode, ...props }: FieldProps) {
  const { field, fieldState } = fieldData;
  const { label, style, ...rest } = props;
  const { setValue } = useFormContext();
  const [country, setCountry] = React.useState<string | undefined>(countryCode);

  const options = useMemo(() => {
    return State.getStatesOfCountry(countryCode || "").map((state) => ({
      key: state.isoCode,
      value: state.isoCode,
      label: state.name,
    }));
  }, [countryCode])

  useEffect(() => {
    if(countryCode !== country){
      setValue(field.name, "");
      setCountry(countryCode);
    } 
  }, [country, setValue, countryCode, field.name])

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
