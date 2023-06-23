import React from 'react';
import PropTypes from 'prop-types';
import SelectControl from '.';
import Label from '../Label';
import { useFormContext, Controller } from 'react-hook-form';

import type { FieldProps } from '.';
import type { FieldDataType } from '../types';
import { Div } from '@styled_comps/blocks'

export default function SelectController(props: Omit<FieldProps, "fieldData">){
  
  const { type } = props;
  const { control } = useFormContext();
  
  const renderControl = (fieldData: FieldDataType) => {
    if(type === 'hidden') return <SelectControl fieldData={fieldData} {...props}  />
    return (
      <Div className="controller-input">
        <SelectControl 
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

  // return (
  //   <div>
  //     {labelProps.label && <Label {...labelProps} />}
  //     <Controller
  //       {...controllerProps}
  //       render={inputData => <SelectControl {...inputData} {...inputProps} />}
  //     />
  //   </div>
  // );
}
