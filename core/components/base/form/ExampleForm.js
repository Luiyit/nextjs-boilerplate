import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import * as Controls from '.';
import { Block } from '../../styles/blocks';

export default function FormExample() {
  const methods = useForm({ mode: 'onChange' }); // Remove
  const { handleSubmit, control } = methods;

  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Block bColor="fff" bRadius="8px" padding="36px">
      <FormProvider {...methods}>
        <Controls.Form onSubmit={handleSubmit(onSubmit)}>
          <Controls.CalendarController
            name="birthday"
            label="Birthday"
            rules={{ required: true }}
          />
          <Controls.CalendarPickerController
            name="expiredAt"
            label="Expired at"
            rules={{ required: true }}
          />
          <Controls.FloatInputController
            name="name"
            label="First name"
            rules={{ required: true }}
          />
          <Controls.FloatSelectController
            name="age"
            label="Age"
            options={new Array(10).fill().map((_, idx) => ({
              label: idx + 1,
              value: idx + 1,
            }))}
            rules={{ required: true }}
          />
          <Controls.InputController
            name="lastName"
            label="Last name"
            placeholder="Type your last name"
            rules={{ required: true }}
          />
          <Controls.RadioController
            name="hobby"
            label="Hobby"
            options={[
              { label: 'Movie', value: 'movie' },
              { label: 'Video game', value: 'game' },
            ]}
            rules={{ required: true }}
          />
          <Controls.SelectController
            name="job"
            label="Job"
            options={[
              { label: 'Engineers', value: 'engineers' },
              { label: 'SRE', value: 'sre' },
            ]}
            placeholder="Current job"
            rules={{ required: true }}
          />
          <Controls.TimeRangeController
            name="time"
            label="Time picker"
            use12Hours
            showTime={{
              format: 'HH:mm',
            }}
            rules={{ required: true }}
          />
        </Controls.Form>
        <DevTool control={control} /> {/* set up the dev tool */}
      </FormProvider>
    </Block>
  );
}
