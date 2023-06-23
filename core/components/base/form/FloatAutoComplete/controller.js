import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import FloatAutoCompleteControl from '.';

const AutocompleteController = ({ rules, name, defaultValue, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={inputData => (
        <FloatAutoCompleteControl inputData={inputData} {...props} />
      )}
    />
  );
};

AutocompleteController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
};

export default AutocompleteController;
