import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from './AuthPage.module.css';
export default function AuthPage() {
  return (
    <div className={styles.loginContainer}>
      <Nav />
      <Outlet />
    </div>
  );
}
