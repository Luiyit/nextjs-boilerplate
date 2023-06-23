import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextAreaControl from '.';

import type { FieldProps } from '.';
import type { FieldDataType } from '../types';
import { Div } from '@styled_comps/blocks'

function TextAreaController(props: Omit<FieldProps, "fieldData">){
  
  const { control } = useFormContext();
  const renderControl = (fieldData: FieldDataType) => (
    <Div className="controller-input">
      <TextAreaControl 
        fieldData={fieldData} 
        {...props} 
      />
    </Div>
  )

  return (
    <Controller
      control={control}
      render={renderControl}
      {...props}
    />
  );
};

export default TextAreaController;
