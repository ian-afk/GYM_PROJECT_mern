import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestOptions from '../../utils/requestClass';

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
    const request = new RequestOptions('GET');

    async function getEmployees() {
      const res = await fetch(url, request.options);
      const json = await res.json();
      setEmployees(json.employees);
    }

    getEmployees();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setTrainer((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = setUrl('trainers');
    const body = {
      employee: trainer.employee,
      experties: trainer.experties,
    };
    const request = new RequestOptions('POST', '', body);
    async function postTrainer() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      navigate(`/trainers/${json.data.trainers._id}`);
    }

    postTrainer();
  }
  return (
    <>
      <h1>Create Trainer</h1>
      <form onSubmit={handleSubmit}>
        <label>Trainer</label>
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
