import React from 'react';

const CalendarHeader = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-header">
      {daysOfWeek.map((dayName) => (
        <div key={dayName} className="header-cell">
          {dayName}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;
