import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestOptions from '../../utils/requestClass';

export default function GymCreate() {
  const [gymbranch, setGymbranch] = useState({
    gymLevel: '',
    address: '',
    email: '',
    gymLocation: {
      address: '',
    },
    employees: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setGymbranch((prev) => {
      const newGym = { ...prev };
      if (name === 'address') {
        newGym.gymLocation = { [name]: value };
        return newGym;
      }

      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      gymLevel: gymbranch.gymLevel,
      email: gymbranch.email,
      gymLocation: {
        address: gymbranch.gymLocation.address,
      },
      employees: [],
    };
    const url = `${import.meta.env.VITE_API_URL}/gymbranches/`;
    const request = new RequestOptions('POST', '', body);
    async function postGymbranch() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      console.log(json);
      alert(json.message);
      navigate(`/gymbranches/${json.gymbranches._id}`);
    }

    postGymbranch();
  }
  return (
    <>
      <h2>Create Gym branch</h2>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Manager</label>
          <select>
            <option>TEST</option>
            <option>TEST2</option>
          </select>
          <br />
          <label htmlFor="">Gym Level</label>
          <select
            name="gymLevel"
            onChange={handleChange}
            value={gymbranch.gymLevel}
          >
            <option value="junior">JUNIOR</option>
            <option value="pro">PRO</option>
            <option value="delux">DELUX</option>
          </select>

          <br />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={gymbranch.email}
            onChange={handleChange}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={gymbranch.gymLocation.address}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Submit</button>
          <Link to={`/gymbranches`}>Back to List</Link>
        </form>
      )}
    </>
  );
}
