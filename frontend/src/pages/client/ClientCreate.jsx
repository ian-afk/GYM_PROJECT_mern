import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestOptions from '../../utils/requestClass';

export default function ClientCreate() {
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    address: '',
    contactNo: '',
    email: '',
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setClient((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/clients`;
    const body = {
      firstName: client.firstName,
      lastName: client.lastName,
      age: client.age,
      gender: client.gender,
      address: client.address,
      email: client.email,
      contactNo: client.contactNo,
    };

    const request = new RequestOptions('POST', '', body);

    async function postClient() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      navigate(`/clients/${json.clients._id}`);
    }

    postClient();
  }
  return (
    <>
      <h1>Create Cliente</h1>
      <form onSubmit={handleSubmit}>
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
        <br />
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={client.age}
          onChange={handleChange}
        />
        <br />
        <label>Gender</label>
        <select
          value={client.gender}
          name="gender"
          onChange={handleChange}
          required
        >
          <option value="">Select gender</option>
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
        />
        <br />
        <label>Contact No</label>
        <input
          type="text"
          value={client.contactNo}
          name="contactNo"
          onChange={handleChange}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={client.email}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <Link to={'/clients'}>Back to list</Link>
      </form>
    </>
  );
}
