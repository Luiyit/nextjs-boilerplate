import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import InputControl from '.';

const InputController = ({ rules, name, defaultValue, prefix, ...props }) => {
  const { control } = useFormContext();

  if (prefix)
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={inputData => (
          <InputControl
            inputData={inputData}
            {...props}
            onChange={e => {
              let { value } = e.target;
              if (!e.target.value.includes(prefix)) {
                value =
                  e.target.value.length > inputData.field.value.length
                    ? `${prefix}${e.target.value}`
                    : e.target.value;
              }
              inputData.field.onChange(() => value);
            }}
          />
        )}
      />
    );

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={inputData => <InputControl inputData={inputData} {...props} />}
    />
  );
};

InputController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  prefix: PropTypes.string,
  iconprefix: PropTypes.element,
};

export default InputController;
