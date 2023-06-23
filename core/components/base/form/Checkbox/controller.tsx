import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Checkbox from '.';
import { Div } from '@styled_comps/blocks';
import type { FieldProps } from '.';
import type { FieldDataType } from '../types';

export default function CheckboxController(props: Omit<FieldProps, "fieldData">){
  const { type } = props;
  const { control } = useFormContext();

  const renderControl = (fieldData: FieldDataType) => {
    if(type === 'hidden') return <Checkbox fieldData={fieldData} {...props}  />
    return (
      <Div className="controller-input">
        <Checkbox 
          fieldData={fieldData} 
          {...props} 
        />
      </Div>
    )
  }

  return (
    <Controller
      control={control}
      render={renderControl}
      {...props}
    />
  );
};

