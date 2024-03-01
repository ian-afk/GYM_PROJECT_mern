import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from './ClientPage.module.css';
function ClientPage() {
  return (
    <div className={styles.clientContainer}>
      <Nav />
      <Outlet />
    </div>
  );
}

export default ClientPage;
