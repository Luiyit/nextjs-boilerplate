import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import DatePickerControl from '.';
import Label from '../Label';
import useFormContext from '../hooks/controller';

export default function DatePickerController(props) {
  const { labelProps, controllerProps, inputProps } = useFormContext(props);

  return (
    <div>
      {labelProps.label && <Label {...labelProps} />}
      <Controller
        {...controllerProps}
        render={inputData => (
          <DatePickerControl {...inputData} {...inputProps} />
        )}
      />
    </div>
  );
}

DatePickerController.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  shouldUnregister: PropTypes.bool,
};
