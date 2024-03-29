import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';

export default function EmployeeCreate() {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    dob: '',
    gender: '',
    address: '',
    email: '',
  });

  const { token, isLoggedIn, setToken, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;

    setEmployee((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/employees`;
    const body = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender: employee.gender,
      age: employee.age,
      dob: employee.dob,
      address: employee.address,
      email: employee.email,
    };
    const request = new RequestOptions('POST', token, body);

    async function createEmployee() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      console.log(json);
      navigate(`/employees/${json.data.employees._id}`);
    }

    createEmployee();
  }
  return (
    <>
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="dob"
          value={employee.dob}
          onChange={handleChange}
        />
        <label>Age</label>
        <input
          type="number"
          name="age"
          min={18}
          max={50}
          value={employee.age}
          onChange={handleChange}
        />
        <label>Gender</label>
        <select value={employee.gender} name="gender" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <label>Address</label>
        <input
          type="text"
          value={employee.address}
          name="address"
          onChange={handleChange}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          value={employee.email}
          name="email"
          onChange={handleChange}
        />

        <button type="submit">Create</button>
        <Link to={'/employees'}>Back to List</Link>
      </form>
    </>
  );
}
