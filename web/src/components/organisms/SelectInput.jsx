import { Label, Select } from 'flowbite-react'

const SelectInput = ({
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
      {label && <Label value={label} />}
      <Select id={name} variant='outlined' {...formRegister} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <span className='text-xs text-red-700'>{error}</span>}
    </div>
  )
}

export default SelectInput
