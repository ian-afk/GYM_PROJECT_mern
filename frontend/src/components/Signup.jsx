import { useEffect, useState } from 'react';
import RequestOptions from '../utils/requestClass';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup({ style }) {
  const [signup, setSignup] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const navigate = useNavigate();
  const { setToken, setIsLoggedIn, isLoggedIn } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      window.scrollTo(0, 0);
    }
  }, [loggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignup((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: `${signup.firstName} ${signup.lastName}`,
      email: signup.email,
      password: signup.password,
      passwordConfirm: signup.passwordConfirm,
    };
    const url = `${import.meta.env.VITE_API_URL}/users/signup`;
    const request = new RequestOptions('POST', '', body);

    const login = async function () {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      console.log(json);

      if (json.status === 'fail') alert(json.message);
      else {
        alert(json.message);
        setToken(json.token);
        setIsLoggedIn(true);
        setLoggedIn(true);
      }
    };

    setSignup({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });

    login();
    setLoggedIn(false);
  };
  return (
    <>
      <div>
        <h3>Sigup</h3>
      </div>
      <form onSubmit={handleSubmit} action="#">
        <label htmlFor="#">First Name</label>
        <input
          type="text"
          name="firstName"
          value={signup.firstName}
          onChange={handleChange}
        />
        <label htmlFor="#">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={signup.lastName}
          onChange={handleChange}
        />
        <label htmlFor="#">Email</label>
        <input
          type="email"
          name="email"
          value={signup.email}
          onChange={handleChange}
        />
        <label htmlFor="#">Password</label>
        <input
          type="password"
          name="password"
          value={signup.password}
          onChange={handleChange}
        />
        <label htmlFor="#">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          value={signup.passwordConfirm}
          onChange={handleChange}
        />
        <input type="submit" className={style} />
      </form>
    </>
  );
}

export default Signup;
