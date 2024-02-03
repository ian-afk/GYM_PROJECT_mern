import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestOptions from '../../utils/requestClass';

export default function ScheduleCreate() {
  const [schedule, setSchedule] = useState({
    startDate: '',
    timeStart: '',
    timeEnd: '',
    trainer: '',
    clients: '',
  });
  const navigate = useNavigate();

  useEffect(() => {}, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/schedules`;
    const body = {
      startDate: schedule.startDate,
      timeStart: schedule.timeStart,
      timeEnd: schedule.timeEnd,
    };
    const request = new RequestOptions('POST', '', body);

    async function postSchedule() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      navigate(`/schedules/${json.schedules._id}`);
    }

    postSchedule();
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
