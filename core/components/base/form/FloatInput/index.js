import React from 'react';
import PropTypes from 'prop-types';
import FloatLabel from '../FloatLabel';
import InputControl from '../Input';
import { types } from '../propTypes';

const FloatInput = ({ inputData, label, floatPlaceHolder , ...props }) => (
  <FloatLabel
    label={label}
    floatPlaceHolder={floatPlaceHolder}
    floating={!!inputData.field.value}
    withError={!!inputData.fieldState.error}
  >
    <InputControl inputData={inputData} {...props} />
  </FloatLabel>
);

FloatInput.propTypes = {
  inputData: types.inputData(PropTypes.string),
  floating: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FloatInput;
