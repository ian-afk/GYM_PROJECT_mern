import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';
import RequestOptions from '../../utils/requestClass';

export default function GymList() {
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const path = 'gymbranches';
  const {
    data: gymbranches,
    setData: setGymBranches,
    isLoading,
    url,
    message,
  } = useAPIList(path, token, setIsLoggedIn);

  function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete?');
    const request = new RequestOptions('DELETE', token);
    const gymUrl = `${url}/${id}`;
    async function deleteGymbranch() {
      const res = await fetch(gymUrl, request.options);
      const json = await res.json();

      setGymBranches((prev) => prev.filter((el) => el._id !== id));
      alert(json.message);
    }
    if (confirm) {
      deleteGymbranch();
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <NotLoggedIn message={message} />
      ) : (
        <>
          {' '}
          <h1>List of Gym branches</h1>
          <Link to={`/gymbranches/create`}>Add Gym Branches</Link>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Gym Name</th>
                  <th>Email</th>
                  <th>Manager</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {gymbranches.map((gymb) => {
                  return (
                    <tr key={gymb._id}>
                      <td>{gymb.name}</td>
                      <td>{gymb.email}</td>
                      <td>{gymb.employees[0]?.fullName ?? gymb.employee}</td>
                      <td>
                        <Link to={`/${path}/${gymb._id}`}>View</Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(gymb._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
}
