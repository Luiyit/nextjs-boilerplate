import React from 'react';
import { RowWrapper } from './styles';
import AccessTime from './accessTime';
import ExpireTime from './expireTime';

const OneTime = ({
  accessType,
  startTime,
  expirationType,
  finishTime,
  expirationDays,
  isCreating,
}) => {
  return (
    <>
      <RowWrapper>
        <AccessTime
          label="program"
          accessType={accessType}
          startTime={startTime}
          isCreating={isCreating}
        />
        <ExpireTime
          label="program"
          expirationType={expirationType}
          finishTime={finishTime}
          expirationDays={expirationDays}
          isCreating={isCreating}
        />
      </RowWrapper>
    </>
  );
};

export default OneTime;
