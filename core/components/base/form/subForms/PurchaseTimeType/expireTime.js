import React from 'react';
import PropTypes from 'prop-types';
import {
  SelectController,
  CalendarController,
  InputController,
  NoTitle,
} from '../../../Form';
import { useFormContext, useWatch } from 'react-hook-form';
import { ColumnWrapper } from './styles';
import BrandIcon from '../../../Icons/BrandIcon';
import { checkDate } from './helper.js';

const ExpireTime = ({
  expirationType,
  finishTime,
  expirationDays,
  label,
  isCreating,
}) => {
  const { control, watch } = useFormContext();
  const watchExpiration = useWatch({
    control,
    name: 'expirationType', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: expirationType, // default value before the render
  });

  return (
    <ColumnWrapper>
      <SelectController
        label={'When should this ' + label + ' expire?'}
        name="expirationType"
        options={[
          { label: 'Never', value: 'never' },
          {
            label: 'A certain number of days after purchase',
            value: 'days',
          },
          {
            label: 'On a specific date',
            value: 'expiration_date',
          },
        ]}
        placeholder=""
        defaultValue={expirationType || 'never'}
      />
      {watchExpiration == 'expiration_date' && (
        <NoTitle>
          <CalendarController
            fromNow
            name="finishTime"
            icon={<BrandIcon name="calendar-line" />}
            defaultValue={finishTime ? new Date(finishTime) : null}
            rules={{
              required: 'Expire date is required',
              validate: v => {
                if (!isCreating && checkDate(v, new Date(startTime)))
                  return true;
                const currentDay = new Date();
                currentDay.setUTCHours(0, 0, 0, 0);
                if (currentDay > new Date(v)) return 'cannot be in the past';
                const startTime = watch('startTime');

                const res = startTime
                  ? new Date(startTime) < new Date(v)
                  : true;
                return res || 'Should be greater than start time';
              },
            }}
          />
        </NoTitle>
      )}
      {watchExpiration == 'days' && (
        <NoTitle>
          <InputController
            name="expirationDays"
            placeholder="Days"
            defaultValue={expirationDays?.toString() || ''}
            rules={{
              required: 'Custom days is required',
              validate: value => {
                return /^[0-9]*$/.test(value) || 'Only numbers';
              },
            }}
          />
        </NoTitle>
      )}
    </ColumnWrapper>
  );
};

ExpireTime.propTypes = {
  expirationType: PropTypes.string,
  finishTime: PropTypes.any,
  expirationDays: PropTypes.number,
  label: PropTypes.string,
};

export default ExpireTime;
