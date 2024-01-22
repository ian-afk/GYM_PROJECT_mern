import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
export default function ClientView() {
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    address: '',
    email: '',
  });
  const [init, setInit] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
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
        console.log(json);
        setClient(json.client);
        setInit(json.client);
        setLoading(false);
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setClient((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleEdit() {
    setDisabled(!disabled);
    setClient(init);
  }

  function handleDelete() {}
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <h1>Client Details</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={client.firstName}
            onChange={handleChange}
            disabled={disabled}
          />
          <br />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
            disabled={disabled}
          />
          <br />
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={client.age}
            onChange={handleChange}
            disabled={disabled}
          />
          <br />
          <label>Gender</label>
          <select
            value={client.gender}
            name="gender"
            onChange={handleChange}
            disabled={disabled}
            required
            defaultValue=""
          >
            <option value="" selected>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <label>Address</label>
          <input
            type="text"
            value={client.address}
            name="address"
            onChange={handleChange}
            disabled={disabled}
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={client.email}
            onChange={handleChange}
            disabled={disabled}
          />
          {!disabled && <button type="submit">Save</button>}
          <button type="button" onClick={() => handleEdit(client._id)}>
            {disabled ? 'Edit' : 'Cancel'}
          </button>
          {disabled && (
            <button type="button" onClick={() => handleDelete(client._id)}>
              Delete
            </button>
          )}
          <Link to={'/clients'}>Back to list</Link>
        </form>
      )}
    </>
  );
}
