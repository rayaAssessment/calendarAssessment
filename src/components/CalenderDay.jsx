import React from 'react';
import { format } from 'date-fns';

const CalendarDay = ({
  day,
  isCurrentMonth,
  isWeekend,
  isToday,
  onClick,
  reminders,
  onReminderClick

}) => {
  return (
    <div
      className={`day-cell 
      ${isCurrentMonth ? '' : 'not-current-month'} 
      ${isWeekend ? 'weekend' : ''}
      ${isToday ? 'today' : ''}
      `}
      onClick={()=> onClick(day)}
    >
      <span>
        {format(day, 'd')}
      </span>
      <div className="reminders-list">
        {reminders.map((reminder, index) => (
          <div
            className="reminder"
            key={index}
            onClick={(e) => {
              e.stopPropagation(); 
              onReminderClick(reminder); // Pass the reminder object correctly
            }}>
            {reminder.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;