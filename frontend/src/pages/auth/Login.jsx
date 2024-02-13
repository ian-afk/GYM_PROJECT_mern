import { useState } from 'react';
import RequestOptions from '../../utils/requestClass';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { setToken, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      email: user.email,
      password: user.password,
    };
    const url = `${import.meta.env.VITE_API_URL}/users/login`;
    const request = new RequestOptions('POST', '', body);

    const login = async function () {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      console.log(json);
      alert(json.message);
      setToken(json.token);
      setIsLoggedIn(() => (json.status === 'success' ? true : false));
      navigate(`/`);
    };
    login();
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
