import React from 'react'
import { Label, Checkbox } from 'flowbite-react'

const CheckboxInput = ({
  errors,
  name,
  register,
  label,
  options = [],
  ...rest
}) => {
  const formRegister = name && register && { ...register(name) }
  const error = errors?.[name]?.message || null

  return (
    <div className='flex flex-col space-y-3'>
      {label && <Label htmlFor={name} value={label} />}
      <div className='grid grid-cols-2 gap-4'>
        {options.map((option) => (
          <div key={option.value} className='flex items-center'>
            <Checkbox
              id={`${name}-${option.value}`}
              value={option.value}
              {...formRegister}
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

export default CheckboxInput
