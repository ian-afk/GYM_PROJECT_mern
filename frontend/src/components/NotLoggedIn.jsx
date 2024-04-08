import style from './NotLoggedIn.module.css';

function NotLoggedIn({ message }) {
  console.log(message);
  return (
    <div className={style.notLoggedIn}>
      <h1>{message}</h1>
    </div>
  );
}

export default NotLoggedIn;
