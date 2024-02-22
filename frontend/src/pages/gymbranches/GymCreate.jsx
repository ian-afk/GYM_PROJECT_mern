import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import styles from './GymCreate.module.css';

export default function GymCreate() {
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const [gymbranch, setGymbranch] = useState({
    gymLevel: '',
    address: '',
    email: '',
    gymLocation: {
      address: '',
    },
    employee: '',
  });
  const [employees, setEmployees] = useState([]);
  const [initEmp, setInitEmp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  function setUrl(url) {
    const newUrl = `${import.meta.env.VITE_API_URL}/${url}`;
    return newUrl;
  }
  useEffect(() => {
    const url = setUrl('employees');
    const request = new RequestOptions('GET', token);
    async function getEmployees() {
      const res = await fetch(url, request.options);
      const json = await res.json();

      console.log(json);
      if (json.status === 'fail') setMessage(json.message);
      else setEmployees(json.employees);
    }

    getEmployees();
  }, []);
  function handleChange(e) {
    console.log(e.target);
    const { name, value, dataValue } = e.target;
    console.log(value, name, dataValue);
    setGymbranch((prev) => {
      const newGym = { ...prev };
      if (name === 'address') {
        newGym.gymLocation = { [name]: value };
        return newGym;
      }
      // if (name === 'employee') {
      //   console.log(name);
      //   newGym[name] = 'a';
      // }

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
      employee: gymbranch.employee,
    };
    const url = `${import.meta.env.VITE_API_URL}/gymbranches/`;
    const request = new RequestOptions('POST', token, body);
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
          <input
            type="text"
            name="employee5"
            onChange={(e) => setInitEmp(e.target.value)}
          />
          <div className={styles.dropdown}>
            {employees
              .filter((emp) => {
                const searchEmp = initEmp.toLowerCase();
                const fullName = emp.fullName.toLowerCase();

                return searchEmp && fullName.startsWith(searchEmp);
              })
              .map((emp) => (
                <p
                  className={styles.dropdownRow}
                  key={emp._id}
                  onClick={() =>
                    setGymbranch((prev) => ({
                      ...prev,
                      [gymbranch.employee]: emp._id,
                    }))
                  }
                >
                  {emp.fullName}
                </p>
              ))}
          </div>
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
