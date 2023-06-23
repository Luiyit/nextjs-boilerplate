import React from 'react';
import { SelectController, CalendarController, NoTitle } from '../../../Form';
import { useFormContext, useWatch } from 'react-hook-form';
import { ColumnWrapper } from './styles';
import BrandIcon from '../../../Icons/BrandIcon';
import PropTypes from 'prop-types';
import { checkDate } from './helper.js';

const AccessTime = ({ accessType, startTime, label, isCreating }) => {
  const { control } = useFormContext();
  const watchAccess = useWatch({
    control,
    name: 'accessType',
    defaultValue: accessType,
  });

  return (
    <ColumnWrapper>
      <SelectController
        label={'When should this ' + label + ' begin?'}
        name="accessType"
        options={[
          {
            label: 'Immediately after purchase',
            value: 'immediately',
          },
          { label: 'On a specific start date', value: 'scheduled' },
        ]}
        placeholder=""
        defaultValue={accessType || 'immediately'}
      />
      {watchAccess == 'scheduled' && (
        <NoTitle>
          <CalendarController
            fromNow
            name="startTime"
            icon={<BrandIcon name="calendar-line" />}
            defaultValue={startTime ? new Date(startTime) : null}
            rules={{
              required: 'Start date is required',
              validate: v => {
                if (!isCreating && checkDate(v, new Date(startTime)))
                  return true;
                const currentDay = new Date();
                currentDay.setUTCHours(0, 0, 0, 0);
                return currentDay <= new Date(v) || 'cannot be in the past';
              },
            }}
          />
        </NoTitle>
      )}
    </ColumnWrapper>
  );
};

AccessTime.propTypes = {
  accessType: PropTypes.string,
  startTime: PropTypes.any,
  label: PropTypes.string,
};

export default AccessTime;
