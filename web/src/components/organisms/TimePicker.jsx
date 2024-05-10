import React from 'react'

const TimePicker = ({ id, min, max, value, onChange }) => {
  return (
    <div className='flex'>
      <label htmlFor={id} className='w-full'>
        <input
          type='time'
          id={id}
          className='w-full rounded rounded-s-lg bg-gray-50 border text-green-900'
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          required
        />
      </label>
    </div>
  )
}

export default TimePicker
