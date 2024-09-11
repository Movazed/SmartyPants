import React from 'react';
import { FaBook } from 'react-icons/fa';

const Calendar: React.FC = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // Note: January is 0!
  const currentYear = today.getFullYear();

  // Completed assignments (for demo purposes)
  const completedAssignments = [30, 2]; // Add the days of completed assignments

  // Calculate the start day of the current week (Monday as the first day)
  const firstDayOfWeek = new Date(
    currentYear,
    currentMonth,
    currentDay - today.getDay() + 1
  );

  // Calculate the days for the current week
  const getCurrentWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      const dayNumber = date.getDate();
      const isToday = dayNumber === currentDay;
      const isCompleted = completedAssignments.includes(dayNumber);

      days.push(
        <div
          key={i}
          className={`calendar-day text-center py-2 rounded-full border ${
            isToday
              ? 'bg-blue-200 text-blue-600 font-semibold'
              : isCompleted
              ? 'bg-green-200 text-green-600 font-semibold'
              : 'text-gray-700'
          } ${isCompleted ? 'border-green-400' : 'border-transparent'}`}
        >
          {dayNumber}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <button className="p-1 rounded-full hover:bg-gray-200">{'<'}</button>
        <div className="text-lg font-semibold text-gray-700">
          {today.toLocaleString('default', { month: 'long' })} {currentYear}
        </div>
        <button className="p-1 rounded-full hover:bg-gray-200">{'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-sm">
        {daysOfWeek.map(day => (
          <div
            key={day}
            className="calendar-day header font-medium text-gray-500 text-center"
          >
            {day}
          </div>
        ))}
        {getCurrentWeekDays()}
      </div>
      <div className="mt-6 flex items-center space-x-3">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <FaBook />
        </div>
        <div>
          <p className="text-sm text-gray-600 font-semibold">Assignment 04</p>
          <p className="text-xs text-gray-500">Due Date: Oct 02, 2023</p>
        </div>
      </div>
      {/* New Assignment 01 block with a green book */}
      <div className="mt-3 flex items-center space-x-3">
        <div className="bg-green-100 p-3 rounded-full text-green-600">
          <FaBook />
        </div>
        <div>
          <p className="text-sm text-gray-600 font-semibold">Assignment 01</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
