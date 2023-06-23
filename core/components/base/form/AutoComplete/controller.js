import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import SelectControl from '.';
import Label from '../Label';
import useFormContext from '../hooks/controller';

export default function AutocompleteController(props) {
  const { labelProps, controllerProps, inputProps } = useFormContext(props);

  return (
    <div>
      {labelProps.label && <Label {...labelProps} />}
      <Controller
        {...controllerProps}
        render={inputData => <SelectControl {...inputData} {...inputProps} />}
      />
    </div>
  );
}

AutocompleteController.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  shouldUnregister: PropTypes.bool,
};
