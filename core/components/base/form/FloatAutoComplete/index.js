import React from 'react';
import PropTypes from 'prop-types';
import FloatLabel from '../FloatLabel';
import AutoCompleteControl from '../AutoComplete';
import { types } from '../propTypes';

const FloatAutoComplete = ({ inputData, label, ...props }) => (
  <>
    <FloatLabel label={label} floating={!!inputData.field.value}>
      <AutoCompleteControl {...inputData} {...props} />
    </FloatLabel>
  </>
);

FloatAutoComplete.propTypes = {
  inputData: types.inputData(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  floating: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FloatAutoComplete;
