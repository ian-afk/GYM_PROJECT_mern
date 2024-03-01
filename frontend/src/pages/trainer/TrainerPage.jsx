import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from './TrainerPage.module.css';

function TrainerPage() {
  return (
    <div className={styles.trainerContainer}>
      <Nav />
      <Outlet />
    </div>
  );
}

export default TrainerPage;
