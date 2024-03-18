import { 
  startOfMonth,
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isWeekend, 
  addMonths, 
  subMonths,
  format
} from 'date-fns';
import CalendarHeader from '../components/CalenderHeader';
import CalendarDay from '../components/CalenderDay';
import { useState } from 'react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Format the current month for display
  const monthYearString = format(currentMonth, 'MMMM yyyy');

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const monthDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  return (
    <div className="container">
      <div>
        <h2>{monthYearString}</h2>
        <button onClick={handlePreviousMonth}>Previous</button>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      <CalendarHeader />
      <div className="calendar-grid">
        {monthDays.map((day) => (
          <CalendarDay
            key={day.toString()}
            day={day}
            isCurrentMonth={isSameMonth(day, currentMonth)}
            isWeekend={isWeekend(day)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;