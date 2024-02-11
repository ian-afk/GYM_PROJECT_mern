import { useState } from 'react';

export default function Login() {
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
