import React, { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const CalendarScheduler = () => {
  // Initialize state for the current date
  const today = new Date()

  // State to manage the currently viewed month and year
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  // State for the selected date
  const [selectedDate, setSelectedDate] = useState(today)

  // Function to get the days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Function to get the starting day of the month
  const getStartingDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date)
    // Add your logic here to handle the selected date
  }

  // Function to handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1)
        return 11
      }
      return prevMonth - 1
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1)
        return 0
      }
      return prevMonth + 1
    })
  }

  // Render calendar days
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const startingDay = getStartingDayOfMonth(currentMonth, currentYear)

    let calendarDays = []

    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className='p-2' />)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i)
      const isSelected = date.toDateString() === selectedDate.toDateString()
      const isToday = date.toDateString() === today.toDateString()
      const classNames = `cursor-pointer p-2 rounded-lg text-center ${
        isSelected ? 'bg-green-500 text-white' : 'hover:bg-green-100'
      } ${isToday ? 'border-2 border-green-500' : ''}`

      calendarDays.push(
        <div
          key={i}
          className={classNames}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>,
      )
    }

    return calendarDays
  }

  return (
    <div className='p-4 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-center items-center mb-4'>
        <HiChevronLeft
          onClick={handlePreviousMonth}
          className='cursor-pointer text-2xl mr-4'
        />
        <h2 className='text-lg font-bold'>
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
          })}{' '}
          {currentYear}
        </h2>
        <HiChevronRight
          onClick={handleNextMonth}
          className='cursor-pointer text-2xl ml-4'
        />
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
  )
}

export default CalendarScheduler
