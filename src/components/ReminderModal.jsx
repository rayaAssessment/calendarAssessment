import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const ReminderModal = ({
  onSave,
  selectedDay,
  onClose,
  reminderToEdit,
  onDelete,
  onEdit
}) => {

  const [isEditing, setIsEditing] = useState(!reminderToEdit);
  const [reminder, setReminder] = useState({
    text: reminderToEdit?.text || '',
    city: reminderToEdit?.city || '',
    date: reminderToEdit?.date || selectedDay,
    time: reminderToEdit?.time || '',
    id: reminderToEdit?.id
  });
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const fetchWeather = async (city, date) => {
    setLoading(true);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const formattedDate = format(date, 'yyyy-MM-dd');
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${formattedDate}?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Weather data fetch failed');
      const data = await response.json();
      setWeather(`${data.days[0].conditions}`);
    } catch (error) {
      setWeather('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  // When reminderToEdit changes, update the reminder state and setIsEditing
  useEffect(() => {
    if (reminderToEdit) {
      setReminder({
        text: reminderToEdit.text || '',
        city: reminderToEdit.city || '',
        date: reminderToEdit.date || selectedDay,
        time: reminderToEdit.time || '',
        id: reminderToEdit.id
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [reminderToEdit, selectedDay]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.text = reminder.text.length > 0 ? "" : "Description is required.";
    tempErrors.text = reminder.text.length <= 30 ? tempErrors.text : "Description must be 30 characters or less.";
    tempErrors.city = reminder.city ? "" : "City is required.";
    tempErrors.time = reminder.time ? "" : "Time is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Determine whether to add a new reminder or update an existing one based on the presence of an ID.
    if (reminderToEdit) {
      onEdit(reminderToEdit.id, reminder);
    } else {
      onSave({ ...reminder, id: Date.now() });
    }
    onClose();

  };

  return (
    <div className="modal">
      <div className="modal-content">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <label>Desc:
              <textarea type="text" name="text" value={reminder.text} onChange={handleChange} />
              {errors.text && <div className="error">{errors.text}</div>}
            </label>
            <label>
              City: <input type="text" name="city" value={reminder.city} onChange={handleChange} />
              {errors.city && <div className="error">{errors.city}</div>}

            </label>

            <label>
              Time: <input type="time" name="time" value={reminder.time} onChange={handleChange} />
              {errors.time && <div className="error">{errors.time}</div>}
            </label>

            <label>Date: <input type="text" name="date" value={format(new Date(reminder.date), 'yyyy-MM-dd')} disabled /></label>
            <button type="submit">Save Reminder</button>
          </form>
        ) : (
          <>
            <div>Desc: {reminder.text}</div>
            <div>City: {reminder.city}</div>
            <div>Time: {reminder.time}</div>
            <div>Date: {format(new Date(reminder.date), 'yyyy-MM-dd')}</div>
            {weather && <div>Weather: {weather} </div>}

            <div className='btn-wrapper'>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button disabled={weather} onClick={() => fetchWeather(reminder.city, new Date(reminder.date))}>
                {loading ? 'Fetching Weather...' : 'Get Weather'}
              </button>
              <button onClick={() => { onDelete(reminderToEdit.id); onClose(); }}>Delete</button>
            </div>
          </>
        )}


        <button type="button" onClick={onClose} className='close-btn'>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}

export default ReminderModal;