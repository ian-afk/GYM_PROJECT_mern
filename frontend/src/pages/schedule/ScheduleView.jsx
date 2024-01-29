import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ScheduleView() {
  const [schedule, setSchedule] = useState({
    startDate: '',
    timeStart: '',
    timeEnd: '',
    trainer: '',
    client: '',
  });
  const [init, setInit] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const url = (path = '') =>
    `${import.meta.env.VITE_API_URL}/schedules/${path}`;
  useEffect(() => {
    const newUrl = url(id);
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);
    fetch(newUrl, request)
      .then((res) => res.json())
      .then((json) => {
        setSchedule(json.schedule);
        setInit(json.schedule);
        setLoading(false);
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
  }
  function handleEdit() {
    setIsDisabled(!isDisabled);
    setSchedule(init);
  }

  function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      const newUrl = url(id);
      const request = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      fetch(newUrl, request)
        .then((res) => res.json())
        .then(navigate(`/schedules`));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newUrl = url(id);
    const request = {
      method: 'PATCH',
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
        setSchedule(json.schedule);
        setIsDisabled(true);
      });
  }
  return (
    <>
      <h2>Schedule Details</h2>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label>Date</label>
            <input
              type="date"
              name="startDate"
              value={schedule.startDate.slice(0, 10)}
              onChange={handleChange}
              disabled={isDisabled}
            />
            <br />
            <label>From</label>
            <input
              type="text"
              name="timeStart"
              onChange={handleChange}
              value={schedule.timeStart}
              disabled={isDisabled}
            />
            <br />
            <label>To</label>
            <input
              type="text"
              name="timeEnd"
              onChange={handleChange}
              value={schedule.timeEnd}
              disabled={isDisabled}
            />
            <br />
            {/* <label>Trainer</label>
        <select
          name="trainer"
          onChange={handleChange}
          value={schedule.trainer}
          required
        >
          <option value={schedule.trainer}>{schedule.trainer}</option>
        </select> */}
            {!isDisabled && <button type="submit">Save</button>}
            <button type="button" onClick={() => handleEdit()}>
              {isDisabled ? 'Edit' : 'Cancel'}
            </button>
            {isDisabled && (
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            )}
            <Link to={'/schedules'}>Back to list</Link>
          </form>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Clients Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Client test</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
