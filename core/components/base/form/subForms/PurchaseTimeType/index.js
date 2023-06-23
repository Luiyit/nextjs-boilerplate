import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, useWatch } from 'react-hook-form';
import { FullRow, TagSelectorController } from '../../../Form';
import OneTime from './oneTime';
import Subscription from './subscription';

const PurchaseTimeType = ({
  isSubscription,
  status,
  isCreating,
  ...params
}) => {
  const { control } = useFormContext();
  const watchSubscription = useWatch({
    control,
    name: 'isSubscription', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: isSubscription, // default value before the render
  });
  const offeredOptions = [
    {
      name: 'one_time',
      label: 'One time',
      value: false,
    },
    {
      name: 'subscription',
      label: 'Subscription',
      value: true,
    },
  ];

  const selectorOptions =
    isCreating || status == 'draft'
      ? offeredOptions
      : offeredOptions.filter(types => types.value === isSubscription);

  return (
    <>
      <FullRow>
        <TagSelectorController
          name="isSubscription"
          title="Should this be offered as a one-time purchase or as a recurring subscription?"
          type="single"
          options={selectorOptions}
          defaultValue={isSubscription || false}
          expandable={false}
          bordered={false}
          size="medium"
          headerSize="16px"
          canUnselect={false}
          disabled={!isCreating}
        />
      </FullRow>
      {!watchSubscription && <OneTime {...params} isCreating={isCreating} />}
      {watchSubscription && (
        <Subscription {...params} isCreating={isCreating} status={status} />
      )}
    </>
  );
};

PurchaseTimeType.propTypes = {
  isSubscription: PropTypes.bool,
  isCreating: PropTypes.bool,
};

PurchaseTimeType.defaultProps = {
  isCreating: false,
  isSubscription: false,
};

export default PurchaseTimeType;
