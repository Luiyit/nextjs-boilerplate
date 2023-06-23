import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectProps } from 'antd';
import Label from '../Label';
import Error from '../Error';
import type { ControllerProps, Type } from '../types';

export interface OptionType { 
  key?: string; 
  label: React.ReactNode; 
  value: string | number;
  disabled?: boolean;
  title?: string;
}

export interface FieldProps extends ControllerProps, Omit<SelectProps<any, OptionType>, "defaultValue">  {
  password?: boolean;
  iconprefix?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  type?: Type;
  renderPopover?: () => React.ReactNode;
}

export default function SelectControl({ fieldData, rules, renderPopover, ...props }: FieldProps) {
  const { field, fieldState } = fieldData;
  const { label, style, ...rest } = props;

  return (
    <>
      {label && (
        <Label 
          label={label} 
          name={field.name} 
          isRequired={rules?.hasOwnProperty('required')} 
          renderPopover={renderPopover}
        />
      )}

      <Select 
        {...field} 
        {...rest}
        showSearch
        style={{ width: '100%', ...style }}
      />
      <Error message={fieldState?.error?.message} />
    </>
  );
}
