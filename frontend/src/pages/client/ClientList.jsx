import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllClients() {
      const url = `${import.meta.env.VITE_API_URL}/clients`;
      const request = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      setLoading(true);
      const res = await fetch(url, request);
      const json = await res.json();

      setClients(json.clients);
      setLoading(false);
    }
    getAllClients();
  }, []);

  function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete?');

    if (confirm) {
      const url = `${import.meta.env.VITE_API_URL}/clients/${id}`;
      const request = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(url, request).then((res) => res.json());
      setClients((client) => {
        return client.filter((el) => el._id !== id);
      });
    }
  }
  return (
    <>
      <h1>Client list</h1>
      {loading ? (
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
