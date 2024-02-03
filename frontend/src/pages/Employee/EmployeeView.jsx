import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LinkButtonComponent from '../../components/LinkButtonComponent';
import useAPIView from '../../hooks/useAPIView';
import RequestOptions from '../../utils/requestClass';

export default function EmployeeView() {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const path = `employees/${id}`;
  const {
    data: employee,
    setData: setEmployee,
    init,
    setInit,
    isLoading,
    url,
  } = useAPIView(path);

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

    const body = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender: employee.gender,
      age: employee.age,
      dob: employee.birthDate,
      address: employee.address,
      email: employee.email,
    };
    const request = new RequestOptions('PATCH', '', body);
    const url = `${import.meta.env.VITE_API_URL}/employees/${id}`;

    async function postEmployee() {
      console.log(url);

      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      console.log(json);
      setInit(json.employees);
      setDisabled(true);
    }

    function isModified(init, current) {
      return JSON.stringify(init) === JSON.stringify(current);
    }

    if (!isModified(init, employee)) {
      postEmployee();
    } else {
      alert('Employee is not modified');
    }
  }

  function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete?');
    const request = new RequestOptions('DELETE');

    async function deleteEmp() {
      const res = await fetch(url, request.options);
      const json = await res.json();

      alert(json.message);
      navigate('/employees');
    }

    if (confirmed) {
      deleteEmp();
    }
  }

  return (
    <>
      <h1>Employee Details</h1>
      {isLoading ? (
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
            name="birthDate"
            value={employee.birthDate}
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
          />

          {!disabled && <button type="submit">Save</button>}
          <>
            <button type="button" onClick={handleEdit}>
              {disabled ? 'Edit' : 'Cancel'}
            </button>
            {disabled && (
              <button type="button" onClick={() => handleDelete(employee._id)}>
                Delete
              </button>
            )}
            <LinkButtonComponent path={'/employees'}>
              Back to list
            </LinkButtonComponent>
          </>
        </form>
      )}
    </>
  );
}
