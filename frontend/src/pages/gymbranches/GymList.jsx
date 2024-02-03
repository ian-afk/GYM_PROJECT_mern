import { Link } from 'react-router-dom';
import LinkButtonComponent from '../../components/LinkButtonComponent';
import { useAPIList } from '../../hooks/useAPIList';

export default function GymList() {
  const path = 'gymbranches';
  const {
    data: gymbranches,
    setData: setGymBranches,
    isLoading,
    url,
  } = useAPIList(path);

  return (
    <>
      <h1>List of Gym branches</h1>
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
                  <td>{gymb.employee}</td>
                  <td>
                    <Link to={`/${path}/${gymb._id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
