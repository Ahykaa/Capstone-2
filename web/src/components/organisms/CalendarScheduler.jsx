import React, { useState } from 'react';

const CalendarScheduler = () => {
  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Create state for the selected date
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Function to get the days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the starting day of the month
  const getStartingDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    // You can add your logic here to handle the selected date
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const startingDay = getStartingDayOfMonth(currentMonth, currentYear);

    let calendarDays = [];

    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className='hidden' />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const classNames = `cursor-pointer p-2 rounded-lg ${
        date.toDateString() === selectedDate.toDateString()
          ? 'bg-blue-500 text-white'
          : 'hover:bg-blue-100'
      }`;
      calendarDays.push(
        <div
          key={i}
          className={classNames}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className='p-4 bg-white shadow-md rounded-lg'>
      <div className='text-center mb-4'>
        <h2 className='text-lg font-bold'>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentYear}
        </h2>
      </div>
      <div className='grid grid-cols-7 gap-2'>
        <div className='text-center'>Sun</div>
        <div className='text-center'>Mon</div>
        <div className='text-center'>Tue</div>
        <div className='text-center'>Wed</div>
        <div className='text-center'>Thu</div>
        <div className='text-center'>Fri</div>
        <div className='text-center'>Sat</div>
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarScheduler;
