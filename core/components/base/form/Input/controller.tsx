import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import InputControl from '.';

import type { FieldProps } from '.';
import type { FieldDataType } from '../types';
import { Div } from '@styled_comps/blocks'

function InputController(props: Omit<FieldProps, "fieldData">){
  const { type } = props;    
  const { control } = useFormContext();
  
  const renderControl = (fieldData: FieldDataType) => {
    if(type === 'hidden') return <InputControl fieldData={fieldData} {...props}  />
    return (
      <Div className="controller-input">
        <InputControl 
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

InputController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  iconprefix: PropTypes.element,
};

export default InputController;
