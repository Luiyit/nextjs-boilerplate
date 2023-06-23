import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import RemoteSelect from '.';

import type { FieldProps } from '.';
import type { FieldDataType } from '../types';
import { Div } from '@styled_comps/blocks'

function SelectController(props: Omit<FieldProps, "fieldData">){

  const { type } = props;    
  const { control } = useFormContext();
  
  const renderControl = (fieldData: FieldDataType) => {
    if(type === 'hidden') return <RemoteSelect fieldData={fieldData} {...props}  />
    
    return (
      <Div className="controller-input">
        <RemoteSelect 
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

export default SelectController;
