import React from 'react';
import PropTypes from 'prop-types';
import FloatLabel from '../FloatLabel';
import SelectControl from '../Select';
import { types } from '../propTypes';

const FloatSelect = ({ inputData, label, ...props }) => (
  <FloatLabel
    label={label}
    floating={
      !!inputData.field.value || [0, ''].includes(inputData.field.value)
    }
  >
    <SelectControl {...inputData} {...props} />
  </FloatLabel>
);

FloatSelect.propTypes = {
  inputData: types.inputData(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  floating: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FloatSelect;
