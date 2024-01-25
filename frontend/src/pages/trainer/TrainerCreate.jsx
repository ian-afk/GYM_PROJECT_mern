import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TrainerCreate() {
  const [trainer, setTrainer] = useState({
    employee: '',
    experties: '',
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  function setUrl(url) {
    const newUrl = `${import.meta.env.VITE_API_URL}/${url}`;
    return newUrl;
  }
  useEffect(() => {
    const url = setUrl('employees');
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.employees);
        setEmployees(json.employees);
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setTrainer((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = setUrl('trainers');
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employee: trainer.employee,
        experties: trainer.experties,
      }),
    };
    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        navigate(`/trainers/${json.data.trainer._id}`);
      });
  }
  return (
    <>
      <h1>Create Trainer</h1>
      <form onSubmit={handleSubmit}>
        <label>Trainer's Name</label>
        <select name="employee" onChange={handleChange}>
          <option value="">Select Trainer</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
        <br />
        <label>Experties</label>
        <input
          type="text"
          name="experties"
          value={trainer.experties}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <Link to={'/trainers'}>Back to List</Link>
      </form>
    </>
  );
}
