import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
{
  /* <i class="fa-solid fa-user"></i> */
}
export default function Nav() {
  const [operation, setOperation] = useState(false);
  const [profile, setProfile] = useState(false);
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn);
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
      </ul>
      <ul>
        <li>About us</li>
        <li>Contact us</li>
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to={'/users/login'}>Sign in</NavLink>
            </li>
            <li className={styles.secondaryButton}>
              <NavLink to={'/users/signup'}>Sign up</NavLink>
            </li>
          </>
        ) : (
          <li>
            <FontAwesomeIcon
              icon={faUser}
              onClick={() => setProfile(!profile)}
            />
          </li>
        )}
        <ul style={{ display: profile ? '' : 'none' }}>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </ul>
    </nav>
  );
}
