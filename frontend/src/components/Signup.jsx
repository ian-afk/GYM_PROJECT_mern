function Signup({ style }) {
  return (
    <>
      <div>
        <h3>Sigup</h3>
      </div>
      <form action="#">
        <label htmlFor="#">First Name</label>
        <input type="text" />
        <label htmlFor="#">Last Name</label>
        <input type="text" />
        <label htmlFor="#">Email</label>
        <input type="email" />
        <label htmlFor="#">Password</label>
        <input type="password" />
        <label htmlFor="#">Confirm Password</label>
        <input type="password" />
        <input type="submit" className={style} />
      </form>
    </>
  );
}

export default Signup;
