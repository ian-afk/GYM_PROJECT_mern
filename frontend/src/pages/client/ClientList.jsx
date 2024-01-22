import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [initClient, setInitClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/clients`;
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading(true);
    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setClients(json.clients);

        setLoading(false);
      });
  }, []);
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
