import dayjs from 'dayjs';
import { Datepicker } from 'flowbite-react';
import { Controller } from 'react-hook-form';

const DatePicker = ({ name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'Date is required' }}
      render={({ field }) => (
        <Datepicker
          value={dayjs(field.value).format('MMM DD, YYYY')}
          onSelectedDateChanged={(date) =>
            field.onChange(dayjs(date).format('YYYY-MM-DD'))
          }
        />
      )}
    />
  );
};

export default DatePicker;
