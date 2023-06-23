import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import FilesControl from '.';

import type { InputProps } from '.';
import type { FieldDataType } from '../types';
import { Div } from '@styled_comps/blocks'

function TextAreaController(props: Omit<InputProps, "fieldData">){
  
  const { control } = useFormContext();
  const renderControl = (fieldData: FieldDataType) => (
    <Div className="controller-input">
      <FilesControl 
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

TextAreaController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default TextAreaController;
