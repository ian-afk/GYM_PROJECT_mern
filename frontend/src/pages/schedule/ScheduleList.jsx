import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';

export default function ScheduleList() {
  const path = `schedules`;
  const {
    data: schedules,
    setData: setSchedules,
    isLoading,
    url,
  } = useAPIList(path);

  function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      const schedUrl = `${url}/${id}`;
      const request = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      fetch(schedUrl, request)
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
      {isLoading ? (
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
