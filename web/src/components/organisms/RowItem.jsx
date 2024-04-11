import React from 'react';

const RowItem = ({ label, value, icon }) => {
  return (
    <div className='flex flex-col py-3 border-b border-gray-200 min-w-48'>
      <div className='flex items-center'>
        {!!icon && <span className='mr-2'>{icon}</span>}
        <span className='font-semibold mr-2'>{label}: </span>
        <span>{value}</span>
      </div>
    </div>
  );
};

export default RowItem;
