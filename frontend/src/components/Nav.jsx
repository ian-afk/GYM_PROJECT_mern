import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>Profile</li>
        <li>
          Operations
          <ul>
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
        </li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </nav>
  );
}
