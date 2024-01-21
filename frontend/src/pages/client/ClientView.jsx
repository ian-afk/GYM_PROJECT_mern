import { useEffect, useState } from 'react';
import { useParmas } from 'react-router-dom';
export default function ClientView() {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/clients/${id}`;
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
        setClient(json.data);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <h1>Client Details</h1>

      <form>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={client.firstName}
          onChange={handleChange}
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={client.lastName}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => handleEdit(TOCHANGE)}>
          Edit
        </button>
      </form>
    </>
  );
}
