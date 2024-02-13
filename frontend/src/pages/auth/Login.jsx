import { useReducer, useState } from 'react';

const initialState = {
  email: '',
  password: '',
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return;
  }
}
export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <form>
        <label>Email</label>
        <input type="email" value={user.email} onChange={handleChange} />
        <br />
        <label>Password</label>
        <input type="password" value={user.password} onChange={handleChange} />
      </form>
    </>
  );
}
