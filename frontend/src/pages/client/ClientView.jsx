import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LinkButtonComponent from '../../components/LinkButtonComponent';
export default function ClientView() {
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    address: '',
    email: '',
  });
  const [init, setInit] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

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

  function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      const url = `${import.meta.env.VITE_API_URL}/clients/${id}`;
      const request = {
        method: 'DELETE',
        header: {
          'Content-Type': 'application/json',
        },
      };

      fetch(url, request)
        .then((res) => res.json())
        .then(() => {
          alert('Successfully deleted');
          navigate(`/clients`);
        });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/clients/${id}`;
    const request = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: client.firstName,
        lastName: client.lastName,
        age: client.age,
        gender: client.gender,
        address: client.address,
        email: client.email,
      }),
    };
    console.log(url);
    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDisabled(true);
        setInit(json.client);
      });
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
            defaultValue={client.gender}
          >
            <option value={client.gender}>{client.gender.toUpperCase()}</option>
            <option value="male">MALE</option>
            <option value="female">FEMALe</option>
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
          <button type="button" onClick={() => handleEdit()}>
            {disabled ? 'Edit' : 'Cancel'}
          </button>
          {disabled && (
            <button type="button" onClick={() => handleDelete(client._id)}>
              Delete
            </button>
          )}
          <LinkButtonComponent path={'/clients'}>
            Back to list
          </LinkButtonComponent>
        </form>
      )}
    </>
  );
}
