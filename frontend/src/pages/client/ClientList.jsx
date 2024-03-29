import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';
export default function ClientList() {
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const path = `clients`;
  const {
    data: clients,
    setData: setClients,
    isLoading,
    url,
    message,
  } = useAPIList(path, token, setIsLoggedIn);

  function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete?');

    const request = new RequestOptions('DELETE', token);
    const clientUrl = `${url}/${id}`;

    async function deleteClient() {
      const res = await fetch(clientUrl, request.options);
      const json = await res.json();

      setClients((client) => {
        return client.filter((el) => el._id !== id);
      });

      alert(json.message);
    }
    if (confirm) {
      deleteClient();
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <NotLoggedIn message={message} />
      ) : (
        <>
          {' '}
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
      )}
    </>
  );
}
