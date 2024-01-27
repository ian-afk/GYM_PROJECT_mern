import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ScheduleCreate() {
  const [schedule, setSchedule] = useState({
    startDate: '',
    timeStart: '',
    timeEnd: '',
    trainer: '',
    clients: '',
  });
  const navigate = useNavigate();

  const url = (path = '') => `${import.meta.env.VITE_API_URL}/${path}`;
  useEffect(() => {}, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newUrl = url('schedules');
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: schedule.startDate,
        timeStart: schedule.timeStart,
        timeEnd: schedule.timeEnd,
      }),
    };
    fetch(newUrl, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        navigate(`/schedules/${json.schedule._id}`);
      });
  }
  return (
    <>
      <h1>Create Schedule</h1>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          name="startDate"
          value={schedule.startDate.slice(0, 10)}
          onChange={handleChange}
        />
        <br />
        <label>From</label>
        <input
          type="datetime-local"
          name="timeStart"
          onChange={handleChange}
          value={schedule.timeStart}
        />
        <br />
        <label>To</label>
        <input
          type="datetime-local"
          name="timeEnd"
          onChange={handleChange}
          value={schedule.timeEnd}
        />
        <button type="submit">Save</button>
        <Link to={'/schedules'}>Back to List</Link>
      </form>
    </>
  );
}
