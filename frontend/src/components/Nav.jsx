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
        <li>Profile</li>
        <li
          onClick={() => setOperation(!operation)}
          className={operation ? 'active' : ''}
        >
          Operations
        </li>
        <ul style={{ display: operation ? '' : 'none' }}>
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
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </nav>
  );
}
