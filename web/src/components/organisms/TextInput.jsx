import React from 'react';
import { FloatingLabel } from 'flowbite-react';

const TextInput = (props) => {
  const {
    errors,
    name,
    register,
    label,
    containerClassName,
    color,
    ...rest
  } = props;

  const formRegister = name && register && register(name);

  const error = errors?.[name]?.message || null;

  return (
    <div className={`w-full ${containerClassName}`}>
      <FloatingLabel
        {...rest}
        {...formRegister}
        label={label}
        color={color} // Pass the color prop to FloatingLabel
      />
      {error && <span className='text-xs text-red-700'>{error}</span>}
    </div>
  );
};

export default TextInput;
