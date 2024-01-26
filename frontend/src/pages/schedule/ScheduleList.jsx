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
  return (
    <>
      <h1>Schedule List</h1>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
