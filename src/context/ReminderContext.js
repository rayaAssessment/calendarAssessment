import React, { createContext, useContext, useState } from 'react';

const RemindersContext = createContext();

export const useReminders = () => useContext(RemindersContext);

export const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  const addReminder = (reminder) => {
    setReminders((prevReminders) => [...prevReminders, {...reminder, id: Date.now()}]);
  };

  const editReminder = (id, updatedReminder) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) => (reminder.id === id ? updatedReminder : reminder))
    );
  };

  const deleteReminder = (id) => {
    setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <RemindersContext.Provider value={{ reminders, addReminder, editReminder, deleteReminder }}>
      {children}
    </RemindersContext.Provider>
  );
};
