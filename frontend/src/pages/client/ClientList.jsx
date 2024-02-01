import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';

export default function ClientList() {
  const path = `clients`;
  const {
    data: clients,
    setData: setClients,
    isLoading,
    url,
  } = useAPIList(path);
  function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete?');

    if (confirm) {
      const clientUrl = `${url}/${id}`;
      const request = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(clientUrl, request).then((res) => res.json());
      setClients((client) => {
        return client.filter((el) => el._id !== id);
      });
    }
  }
  return (
    <>
      <h1>Client list</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <Link to={'/clients/create'}>Create Client</Link>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                return (
                  <tr key={client._id}>
                    <td>{client.firstName}</td>
                    <td>{client.lastName}</td>
                    <td>
                      <Link to={`/clients/${client._id}`}>View</Link>
                      <button onClick={() => handleDelete(client._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
