import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import FloatSelect from '.';

const FloatSelectController = ({ rules, name, defaultValue, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={inputData => <FloatSelect inputData={inputData} {...props} />}
    />
  );
};

FloatSelectController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default FloatSelectController;
