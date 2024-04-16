import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../Home/Footer';
import styles from './AuthPage.module.css';
export default function AuthPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.loginContainer}>
        <Nav />
      </div>
      <Outlet className={styles.loginFormContainer} />
      <Footer style={{ alignSelf: 'flex-end' }} />
    </div>
  );
}
