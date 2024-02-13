import { NavLink } from 'react-router-dom';

export default function LoginLogout() {
  return (
    <ul>
      <li>
        <NavLink to={'users/login'}>Login</NavLink>
      </li>
      <li>Register</li>
      <li>Logout</li>
    </ul>
  );
}
