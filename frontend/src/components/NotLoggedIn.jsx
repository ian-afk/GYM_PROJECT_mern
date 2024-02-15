function NotLoggedIn({ message }) {
  console.log(message);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default NotLoggedIn;
