/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getDateOptions } from './helper';
import FloatSelect from '../FloatSelect';
import Label from '../Label';
import { types } from '../propTypes';
import Error from '../Error';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  position: relative;
  align-items: center;

  & > div {
    flex: 1;
    margin-bottom: 0;
    margin: 0 1px;
  }

  &&& {
    /* CREO QUE YA NO HACE FALTA. WILL SEE */
    /* margin-top: ${({ saveMarginForTitle }) =>
      saveMarginForTitle ? '32px' : 0}; */

    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      border: none;
      padding: 16px 6px 4px 11px;
    }
  }
`;

const IconWrapper = styled.span`
  margin-left: 12px;
`;

const parseDate = date => {
  if (!date) return {};

  const parsed = new Date(date);
  return {
    day: parsed.getDate(),
    month: parsed.getMonth(),
    year: parsed.getFullYear(),
  };
};

const Calendar = ({ inputData, label, icon, fromNow }) => {
  const { field, fieldState } = inputData;
  const dateParsed = parseDate(field.value);
  const [date, setDate] = useState(dateParsed);
  const [dateOptions, setDateOptions] = useState(
    getDateOptions(dateParsed.year, dateParsed.month, fromNow),
  );

  const setSelectValue = (opt, value) => {
    const dateObj = { ...date, [opt]: value };
    const updatedDateOptions = getDateOptions(
      dateObj.year,
      dateObj.month,
      fromNow,
    );
    const isValidDate = dateObj.day <= updatedDateOptions.days.lastItem.value;

    if (isValidDate) {
      const newDate = new Date(dateObj.year, dateObj.month, dateObj.day);
      if (newDate.getDate()) field.onChange(newDate);
    } else {
      dateObj.day = '';
      field.onChange(null);
    }

    setDate(dateObj);
    setDateOptions(updatedDateOptions);
  };

  return (
    <div>
      {label && <Label name={field.name} label={label} />}
      <Wrapper /* saveMarginForTitle={!!label} */>
        {!!icon && <IconWrapper>{icon}</IconWrapper>}
        <FloatSelect
          label="Day"
          name="day"
          options={dateOptions.days}
          defaultValue={date.day}
          inputData={{
            field: {
              onChange: value => setSelectValue('day', value),
              value: date.day,
            },
          }}
        />
        <FloatSelect
          label="Month"
          name="month"
          options={dateOptions.months}
          defaultValue={date.month}
          inputData={{
            field: {
              onChange: value => setSelectValue('month', value),
              value: date.month,
            },
          }}
        />
        <FloatSelect
          label="Year"
          name="year"
          options={dateOptions.years}
          defaultValue={date.year}
          inputData={{
            field: {
              onChange: value => setSelectValue('year', value),
              value: date.year,
            },
          }}
        />
      </Wrapper>
      <Error message={fieldState?.error?.message} />
    </div>
  );
};

Calendar.propTypes = {
  inputData: types.inputData(PropTypes.instanceOf(Date)),
  onChange: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.any,
  fromNow: PropTypes.bool,
};

Calendar.defaultProps = {
  fromNow: false,
};
export default Calendar;
