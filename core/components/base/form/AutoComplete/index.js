import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

export default function AutoCompleteControl(props) {
  const { options, field, fieldState, formState, inputStyle, ...rest } = props;

  return (
    <>
      <AutoComplete {...field} {...rest} style={inputStyle}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </AutoComplete>
      {fieldState?.error?.type === 'required' && 'this info is required'}
    </>
  );
}

AutoCompleteControl.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
    }).isRequired,
  ),
  field: PropTypes.object.isRequired,
  fieldState: PropTypes.object,
  inputStyle: PropTypes.object,
  formState: PropTypes.any,
};

AutoCompleteControl.defaultProps = {
  inputStyle: { width: '100%' },
};
