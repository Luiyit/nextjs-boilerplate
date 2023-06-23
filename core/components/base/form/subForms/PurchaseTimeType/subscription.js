import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { InputController, TagSelectorController } from '../../../Form';
import { RowWrapper, ColumnWrapper } from './styles';
import AccessTime from './accessTime';

const Subscription = ({
  interval,
  intervalDays,
  accessType,
  startTime,
  isCreating,
  status,
}) => {
  const { control } = useFormContext();
  const watchInterval = useWatch({
    control,
    name: 'interval',
    defaultValue: interval || 'weekly',
  });
  const intervalOptions = [
    {
      name: 'weekly',
      label: 'Weekly',
      value: 'weekly',
    },
    {
      name: 'monthly',
      label: 'Monthly',
      value: 'monthly',
    },
    {
      name: 'anually',
      label: 'Annually',
      value: 'anually',
    },
    {
      name: 'custom',
      label: 'Custom',
      value: 'custom',
    },
  ];

  const selectorOptions =
    isCreating || status == 'draft'
      ? intervalOptions
      : intervalOptions.filter(types => types.value === interval);
  return (
    <>
      <TagSelectorController
        name="interval"
        title="How frequently should your subscription renew?"
        type="single"
        options={selectorOptions}
        defaultValue={interval || 'weekly'}
        expandable={false}
        bordered={false}
        size="medium"
        headerSize="16px"
        canUnselect={false}
      />
      <RowWrapper>
        {watchInterval === 'custom' && (
          <ColumnWrapper>
            <div>
              <InputController
                label="How frequently would you like your subscription to renew? (Days)"
                name="intervalDays"
                placeholder=""
                defaultValue={intervalDays || ''}
                rules={{ required: 'Interval days is required' }}
              />
            </div>
          </ColumnWrapper>
        )}
        <AccessTime
          isCreating={isCreating}
          label="subscription"
          accessType={accessType}
          startTime={startTime}
        />
      </RowWrapper>
    </>
  );
};

export default Subscription;
