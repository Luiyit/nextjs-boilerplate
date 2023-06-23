import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Space } from 'antd';

// TODO: Check Radio
export default function RadioControl(props) {
  const { options, field, fieldState, ...rest } = props;

  return (
    <>
      <Radio.Group {...field} {...rest} style={{ width: '100%' }}>
        <Space direction="vertical">
          {options.map(option => (
            <Radio
              key={option.value}
              selected={field.value}
              value={option.value}
              disabled={option.disabled}
              onClick={() => field.onChange(option.value)}
              type="check"
              text={option.label}
              simple
            />
          ))}
        </Space>
      </Radio.Group>
      {fieldState?.error?.type === 'required' && 'this info is required'}
    </>
  );
}

RadioControl.propTypes = {
  options: PropTypes.array,
  field: PropTypes.object.isRequired,
  fieldState: PropTypes.object,
};
