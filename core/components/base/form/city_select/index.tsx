import React, { useEffect, useMemo } from 'react';
import { Select, SelectProps } from 'antd';
import Label from '../Label';
import Error from '../Error';
import type { ControllerProps, Type } from '../types';
import { City }  from 'country-state-city';
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
  stateCode?: string;
  type?: Type;
}

export default function CityControl({ fieldData, rules, countryCode, stateCode, ...props }: FieldProps) {
  const { field, fieldState } = fieldData;
  const { label, style, ...rest } = props;
  const { setValue } = useFormContext();
  const [countryState, setCountryState] = React.useState<string>(`${countryCode}/${stateCode}`);

  const options = useMemo(() => {
    return City.getCitiesOfState(countryCode || "", stateCode || "").map((city) => ({
      key: city.name,
      value: city.name,
      label: city.name,
    }));
  }, [countryCode, stateCode])

  useEffect(() => {
    const newCountryState = `${countryCode}/${stateCode}`;
    if(newCountryState !== countryState){
      setValue(field.name, "");
      setCountryState(newCountryState);
    } 
  }, [countryState, setValue, countryCode, stateCode, field.name])

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
