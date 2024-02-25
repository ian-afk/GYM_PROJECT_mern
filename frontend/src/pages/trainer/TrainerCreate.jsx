import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';
import styles from './TrainerCreate.module.css';

export default function TrainerCreate() {
  const { token, isLoggedIn } = useAuth();
  const [trainer, setTrainer] = useState({
    employee: '',
    experties: '',
  });
  const [message, setMessage] = useState('');
  const [employees, setEmployees] = useState([]);
  const [initEmp, setInitEmp] = useState('');
  const [toggle, setToggle] = useState(true);
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
      if (json.status === 'fail') setMessage(json.message);
      else setEmployees(json.employees);
    }

    getEmployees();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setTrainer((prev) => ({ ...prev, [name]: value }));
  }

  function handleChangeEmp(e) {
    setInitEmp(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const url = setUrl('trainers');
    const body = {
      employee: trainer.employee,
      experties: trainer.experties,
    };
    const request = new RequestOptions('POST', token, body);
    async function postTrainer() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      navigate(`/trainers/${json.data.trainers._id}`);
    }

    postTrainer();
  }
  return (
    <>
      <div className={styles.container}>
        {!isLoggedIn ? (
          <NotLoggedIn message={message} />
        ) : (
          <>
            <h1>Create Trainer</h1>
            <form onSubmit={handleSubmit}>
              <label className={styles.label}>Trainer</label>
              <input
                type="text"
                name="employee"
                value={initEmp}
                onChange={handleChangeEmp}
                className={styles.employee}
                onClick={() => setToggle(!toggle)}
              />
              <div
                className={`${styles.employeeList} ${
                  toggle ? styles.hidden : ''
                }`}

                // onClick={() => setToggle(true)}
                // onMouseEnter={() => setToggle(false)}
                // onMouseLeave={() => setToggle(true)}
              >
                {employees
                  .filter((item) => {
                    const searchItem = initEmp.toLowerCase();
                    const initName = item.fullName.toLowerCase();

                    if (!toggle && searchItem === '') return item;
                    return (
                      searchItem &&
                      initName.startsWith(searchItem) &&
                      initName !== searchItem
                    );
                  })
                  .map((emp) => (
                    <div
                      key={emp._id}
                      onClick={() => {
                        setToggle(true);
                        setInitEmp(emp.fullName);
                        setTrainer((prev) => ({ ...prev, employee: emp._id }));
                      }}
                    >
                      <p key={emp._id}>{emp.fullName}</p>
                    </div>
                  ))}
              </div>
              {/* <select name="employee" onChange={handleChange}>
              <option value="">Select Trainer</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select> */}
              <br />
              <label>Experties</label>
              <input
                type="text"
                name="experties"
                value={trainer.experties}
                onChange={handleChange}
                onFocus={() => setToggle(true)}
                onBlur={() => setToggle(true)}
              />
              <div className={styles.btn}>
                <button type="submit">Save</button>
                <Link to={'/trainers'}>Back to List</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
