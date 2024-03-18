import React from 'react';
import { format } from 'date-fns';

const CalendarDay = ({ day, isCurrentMonth, isWeekend }) => {
  return (
    <div
      className={`day-cell ${isCurrentMonth ? '' : 'not-current-month'} ${isWeekend ? 'weekend' : ''}`}
    >
      {format(day, 'd')}
    </div>
  );
};

export default CalendarDay;
