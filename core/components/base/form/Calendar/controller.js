import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import Calendar from '.';

const CalendarController = ({ rules, name, defaultValue, ...props }) => {
  const { control, setValue } = useFormContext();
  const onChange = date => {
    setValue(name, date);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={inputData => {
        const { field, ...rest } = inputData;
        return (
          <Calendar
            inputData={{ field: { ...field, onChange }, ...rest }}
            {...props}
          />
        );
      }}
    />
  );
};

CalendarController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default CalendarController;
