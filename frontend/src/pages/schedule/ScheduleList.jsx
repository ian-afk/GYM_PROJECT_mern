import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';

export default function ScheduleList() {
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const path = `schedules`;
  const {
    data: schedules,
    setData: setSchedules,
    isLoading,
    url,
    message,
  } = useAPIList(path, token, setIsLoggedIn);

  function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete?');
    const schedUrl = `${url}/${id}`;
    const request = new RequestOptions('DELETE', token);

    async function deleteSchedule() {
      const res = await fetch(schedUrl, request.options);
      const json = await res.json();

      setSchedules((prev) =>
        prev.filter((sched) => {
          return sched._id !== id;
        })
      );

      alert(json.message);
    }
    if (confirmed) {
      deleteSchedule();
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <NotLoggedIn message={message} />
      ) : (
        <>
          {' '}
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
                      <button
                        type="button"
                        onClick={() => handleDelete(sched._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
}
