import React from 'react';

const TotalBox = ({ totalAmount }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='mb-4 px-6'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-striped'>
          <tbody>
            <tr>
              <td className='text-2xl text-right px-5 font-semibold text-gray-900 dark:text-white pt-3'>
                Total Amount:
              </td>
              <td className='block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer pt-3'>
                ₱ {totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalBox;
