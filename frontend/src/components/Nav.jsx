import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>Profile</li>
        <li>
          Operations
          <ul>
            <li>
              <Link to={'/employees'}>Employees</Link>
            </li>
            <li>
              <Link to={'/clients'}>Clients</Link>
            </li>
            <li>
              <Link to={'/trainers'}>Trainers</Link>
            </li>
            <li>
              <Link to={'/schedules'}>Schedules</Link>
            </li>
            <li>Gym branches</li>
            <li>Members</li>
            <li>Payments</li>
            <li>Generate Report</li>
          </ul>
        </li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </nav>
  );
}
