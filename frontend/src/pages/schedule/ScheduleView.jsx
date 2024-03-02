import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LinkButtonComponent from '../../components/LinkButtonComponent';
import useAPIView from '../../hooks/useAPIView';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';

export default function ScheduleView() {
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const path = `schedules/${id}`;
  const {
    data: schedule,
    setData: setSchedule,
    init,
    setInit,
    isLoading,
    url,
    message,
  } = useAPIView(path, token, setIsLoggedIn);

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

    const request = new RequestOptions('DELETE', token);
    async function deleteSchedule() {
      const res = await fetch(url, request.options);
      const json = await res.json();

      alert(json.message);
      navigate(`/schedules`);
    }
    if (confirmed) {
      deleteSchedule();
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      startDate: schedule.dateStart,
      timeStart: schedule.timeStart,
      timeEnd: schedule.timeEnd,
    };
    const request = new RequestOptions('PATCH', token, body);

    async function postSchedule() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      setInit(json.schedules);
      setSchedule(json.schedules);
      setIsDisabled(true);
    }

    if (!isModified(init, schedule)) postSchedule();
    else alert('Schedule is not modified');

    function isModified(init, current) {
      return JSON.stringify(init) === JSON.stringify(current);
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <NotLoggedIn message={message} />
      ) : (
        <>
          <h2>Schedule Details</h2>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <label>Date</label>
                <input
                  type="date"
                  name="dateStart"
                  value={schedule.dateStart}
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
                <LinkButtonComponent path={'/schedules'}>
                  Back to list
                </LinkButtonComponent>
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
      )}
    </>
  );
}
