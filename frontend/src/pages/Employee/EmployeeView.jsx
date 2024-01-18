import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EmployeeView() {
  const { id } = useParams();
  const [disabled, setDisabled] = useState(true);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    dob: '',
    gender: '',
    address: '',
    email: '',
  });
  const [init, setInit] = useState({});
  const [loading, setLoading] = useState(false);

  useState(() => {
    const controller = new AbortController();
    const url = `${import.meta.env.VITE_API_URL}/employees/${id}`;
    const request = {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);
    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        const newEmployee = json.employee;
        newEmployee.dob = newEmployee.dob.slice(0, 10);
        console.log(json);
        setEmployee(newEmployee);
        setInit(json.employee);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setEmployee((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleEdit() {
    setDisabled(!disabled);
    setEmployee(init);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const controller = new AbortController();
    const url = `${import.meta.env.VITE_API_URL}/employees/${id}`;
    const request = {
      signal: controller.signal,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: employee.firstName,
        lastName: employee.lastName,
        gender: employee.gender,
        age: employee.age,
        dob: employee.dob,
        address: employee.address,
        email: employee.email,
      }),
    };

    console.log(url);
    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setInit(json.employee);
        setDisabled(true);
      });
  }
  return (
    <>
      <h1>Employee Details</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            disabled={disabled}
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            disabled={disabled}
          />
          <br />
          <label>Birth date</label>
          <input
            type="date"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
            disabled={disabled}
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            min={18}
            max={50}
            value={employee.age}
            onChange={handleChange}
            disabled={disabled}
          />
          <br />
          <label>Gender</label>
          <select
            value={employee.gender}
            name="gender"
            onChange={handleChange}
            disabled={disabled}
          >
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
            disabled={disabled}
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={employee.email}
            onChange={handleChange}
            disabled={disabled}
          ></input>

          {!disabled && <button type="submit">Save</button>}
          <>
            <button type="button" onClick={handleEdit}>
              {disabled ? 'Edit' : 'Cancel'}
            </button>
            <Link to={'/employees'}>Back to list</Link>
          </>
        </form>
      )}
    </>
  );
}
