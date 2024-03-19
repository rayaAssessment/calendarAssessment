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
  format,
  isToday,
  isSameDay
} from 'date-fns';
import CalendarHeader from '../components/CalenderHeader';
import CalendarDay from '../components/CalenderDay';
import { useState } from 'react';
import { useReminders } from '../context/ReminderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReminderModal from '../components/ReminderModal';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const { reminders, addReminder, editReminder, deleteReminder } = useReminders();
  const [reminderToEdit, setReminderToEdit] = useState(null)

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDayClick = (day, reminder = null) => {
    setSelectedDay(day);
    setReminderToEdit(reminder);
    setModalIsOpen(true)
  };

  const monthYearString = format(currentMonth, 'MMMM yyyy');
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const monthDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  return (
    <div className="container">
      <div className='calendar'>

        <div className='title'>
          <button onClick={handlePreviousMonth}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>{monthYearString}</h2>
          <button onClick={handleNextMonth}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <CalendarHeader />
        <div className="calendar-grid">
          {monthDays.map((day) => (
            <CalendarDay
              key={day.toString()}
              day={day}
              isCurrentMonth={isSameMonth(day, currentMonth)}
              isWeekend={isWeekend(day)}
              isToday={isToday(day)}
              onClick={() => handleDayClick(day)}
              reminders={reminders.filter(reminder => isSameDay(reminder.date, day))}
              onReminderClick={(reminder) => handleDayClick(day, reminder)}
            />
          ))}
        </div>
        {modalIsOpen &&
          <ReminderModal
            selectedDay={selectedDay}
            onSave={addReminder}
            onEdit={editReminder}
            onClose={() => {
              setModalIsOpen(false)
              setReminderToEdit(null)
            }}
            reminders={reminders.filter(reminder => isSameDay(reminder.date, selectedDay))}
            onDelete={deleteReminder}
            reminderToEdit={reminderToEdit}
          />}
      </div>
    </div>
  );
};

export default Calendar;