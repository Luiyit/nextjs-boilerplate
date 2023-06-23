import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import RadioControl from '.';
import Label from '../Label';
import useFormContext from '../hooks/controller';

export default function RadioController(props) {
  const { labelProps, controllerProps, inputProps } = useFormContext(props);

  return (
    <div>
      {labelProps.label && <Label {...labelProps} />}
      <Controller
        {...controllerProps}
        render={inputData => <RadioControl {...inputData} {...inputProps} />}
      />
    </div>
  );
}

RadioController.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  shouldUnregister: PropTypes.bool,
};
