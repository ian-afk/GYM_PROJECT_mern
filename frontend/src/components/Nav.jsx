import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import { useState } from 'react';
export default function Nav() {
  const [operation, setOperation] = useState(false);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li
          onClick={() => setOperation(!operation)}
          // className={operation ? `${styles.active}` : ''}
        >
          Operations
        </li>
        <ul
          className={styles.operations}
          style={{ display: operation ? '' : 'none' }}
        >
          <li>
            <NavLink to="/employees">Employees</NavLink>
          </li>
          <li>
            <NavLink to={'/clients'}>Clients</NavLink>
          </li>
          <li>
            <NavLink to={'/trainers'}>Trainers</NavLink>
          </li>
          <li>
            <NavLink to={'/schedules'}>Schedules</NavLink>
          </li>
          <li>
            <NavLink to={'/gymbranches'}>Gym branches</NavLink>
          </li>
          {/* <li>Members</li>
            <li>Payments</li>
            <li>Generate Report</li> */}
        </ul>
        <li>Profile</li>
      </ul>
      <ul>
        <li>About us</li>
        <li>Contact us</li>
        <li>
          <NavLink to={'users/login'}>Login</NavLink>
        </li>
        <li>Register</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
}
