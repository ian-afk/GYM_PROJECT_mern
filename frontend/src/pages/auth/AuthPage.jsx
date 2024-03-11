import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../Home/Footer';
import styles from './AuthPage.module.css';
export default function AuthPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#929292',
      }}
    >
      <div className={styles.loginContainer}>
        <Nav />
        <Outlet className={styles.loginFormContainer} />
      </div>
      <Footer style={{ alignSelf: 'flex-end' }} />
    </div>
  );
}
