import React from 'react'
import { Label, Checkbox } from 'flowbite-react'
import { useController } from 'react-hook-form'

const CheckboxReserv = ({
  control,
  errors,
  name,
  label,
  options = [],
  ...rest
}) => {
  const { field } = useController({
    name,
    control,
  })
  const error = errors?.[name]?.message || null

  return (
    <div className='flex flex-col space-y-3'>
      {label && <Label htmlFor={name} value={label} />}
      <div className='grid grid-cols-5 gap-4'>
        {options.map((option) => (
          <div key={option.value} className='flex items-center'>
            <Checkbox
              id={`${name}-${option.value}`}
              value={option.value}
              {...field}
              {...rest}
              className='mr-2'
            />
            <Label htmlFor={`${name}-${option.value}`} value={option.label} />
          </div>
        ))}
      </div>
      {error && <span className='text-xs text-red-700'>{error}</span>}
    </div>
  )
}

export default CheckboxReserv
