import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import FloatInput from '.';

const FloatInputController = ({ rules, name, defaultValue, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={inputData => <FloatInput inputData={inputData} {...props} />}
    />
  );
};

FloatInputController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default FloatInputController;
