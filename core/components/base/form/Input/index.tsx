import React from 'react';
import { Input, InputProps } from 'antd';
import styled from 'styled-components';
import Error from '../Error';
import { Flex } from '@styled_comps/blocks';
import Label from '../Label';

const InputPasswordWrapper = styled(Flex)`
  input.ant-input {
    padding: 4px 11px 4px 11px;
  }

  & span.ant-input-suffix {
    padding: 0 10px;
  }
`;

import type { ControllerProps } from '../types';

export interface FieldProps extends ControllerProps, Omit<InputProps, "defaultValue" | "name"> {
  password?: boolean;
  iconprefix?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  renderPopover?: () => React.ReactNode;
}

const PasswordInput = ({ fieldData, rules, ...props }: FieldProps) => {
  const { field, fieldState } = fieldData;
  const { label, password, iconprefix, inputStyle, ...rest } = props;

  if (props.type === 'hidden') return <Input.Password {...field} {...rest} />

  return (
    <InputPasswordWrapper flexDirection="column" marginT="0">
      <Input.Password {...field} {...rest} style={inputStyle} />
      <Error message={fieldState?.error?.message} />
    </InputPasswordWrapper>
  )
}

const TextInput = ({ fieldData, rules, ...props }: FieldProps) => {
  const { field, fieldState } = fieldData;
  const { label, password, iconprefix, inputStyle, ...rest } = props;
  
  if (props.type === 'hidden') return <Input {...field} {...rest} />

  return (
    <Flex flexDirection="column" marginT={label && '0px !important'}>
      <Input {...field} prefix={iconprefix} {...rest} style={inputStyle} />
      <Error message={fieldState?.error?.message} />
    </Flex>
  )
}

export default function InputControl({ label, password, rules, renderPopover, ...props }: FieldProps){
  const { fieldData: { field }, type } = props;
  
  return (
    <>
      {label && type !== 'hidden' && (
        <Label 
          label={label}
          name={field.name} 
          isRequired={rules?.hasOwnProperty('required')} 
          renderPopover={renderPopover} 
        />
      )}
      { password ? <PasswordInput {...props} /> : <TextInput {...props} /> }
    </>
  );
}