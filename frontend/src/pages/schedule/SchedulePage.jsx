import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from './SchedulePage.module.css';
function SchedulePage() {
  return (
    <div className={styles.schedContainer}>
      <Nav />
      <Outlet />
    </div>
  );
}

export default SchedulePage;
