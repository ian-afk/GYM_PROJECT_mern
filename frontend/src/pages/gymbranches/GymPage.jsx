import { Outlet } from 'react-router-dom';
import styles from './GymPage.module.css';
import Nav from '../../components/Nav';
function GymPage() {
  return (
    <div className={styles.gymbranchContainer}>
      <Nav />
      <Outlet />
    </div>
  );
}

export default GymPage;
