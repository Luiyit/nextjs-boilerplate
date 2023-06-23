import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

export default function DatePickerControl(props) {
  const { fieldState, field, ...rest } = props;
  const { value, ...restField } = field;

  return (
    <>
      <DatePicker
        {...rest}
        {...restField}
        value={value ? new Date(value) : null}
        style={{ width: '100%' }}
      />
      {fieldState.error?.type === 'required' && 'this info is required'}
    </>
  );
}

DatePickerControl.propTypes = {
  field: PropTypes.object.isRequired,
  fieldState: PropTypes.object.isRequired,
};
