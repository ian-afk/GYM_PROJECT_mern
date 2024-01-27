import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = (path = '') =>
    `${import.meta.env.VITE_API_URL}/schedules/${path}`;
  useEffect(() => {
    const newUrl = url();
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
        setSchedules(json.schedules);
        setLoading(false);
      });
  }, []);

  function handleDelete(id) {
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
        .then(() => {
          setSchedules((prev) =>
            prev.filter((sched) => {
              return sched._id !== id;
            })
          );
        });
    }
  }
  return (
    <>
      <h1>Schedule List</h1>
      <Link to={'/schedules/create'}>Create Schedule</Link>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Trainer</th>
              <th>Date</th>
              <th>Time Start</th>
              <th>Time End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((sched) => (
              <tr key={sched._id}>
                <td>Trainer Name</td>
                <td>{sched.startDate.slice(0, 10)}</td>
                <td>{sched.timeStart.slice(11)}</td>
                <td>{sched.timeEnd.slice(11)}</td>
                <td>
                  <Link to={`/schedules/${sched._id}`}>View</Link>
                  <button type="button" onClick={() => handleDelete(sched._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
