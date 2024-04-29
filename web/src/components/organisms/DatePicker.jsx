import React from 'react';
import dayjs from 'dayjs';
import { Datepicker } from 'flowbite-react';
import { Controller } from 'react-hook-form';

const DatePicker = ({ name, control, placeholder, label, ...rest }) => {
  return (
    <div className='datepicker-container'>
      {' '}
      {/* Container for positioning */}
      <label className='floating-label'>{label}</label> {/* Floating label */}
      <Controller
        name={name}
        control={control}
        rules={{ required: 'Date is required' }}
        render={({ field }) => (
          <Datepicker
            placeholder={placeholder}
            value={field.value ? dayjs(field.value).format('MMM DD, YYYY') : ''}
            onSelectedDateChanged={(date) =>
              field.onChange(dayjs(date).format('YYYY-MM-DD'))
            }
            {...rest}
          />
        )}
      />
    </div>
  );
};

export default DatePicker;
