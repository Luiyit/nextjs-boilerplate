import React from 'react';
import Error from '../Error';
import { Flex } from '@styled_comps/blocks';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
const { TextArea: AntTetArea } = Input;
import Label from '../Label';

import type { ControllerProps } from '../types';

export interface FieldProps extends ControllerProps, Omit<TextAreaProps, "defaultValue" | "name">{}

const TextAreaControl = ({ fieldData, rules, ...props }: FieldProps) => {
  const { field, fieldState } = fieldData;
  const { label, ...rest } = props;

  return (
    <>
      {label && (
        <Label label={label} name={field.name} isRequired={rules?.hasOwnProperty('required')}/>
      )}
      <Flex flexDirection="column" marginT={label && '0px !important'}>
        <AntTetArea {...field} {...rest} />
        <Error message={fieldState?.error?.message} />
      </Flex>
    </>
  );
};

export default TextAreaControl;
