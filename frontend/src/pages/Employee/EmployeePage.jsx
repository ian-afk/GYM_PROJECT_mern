import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from '../Employee/EmployeePage.module.css';

function EmployeePage() {
  return (
    <div className={styles.empContainer}>
      <Nav />
      <Outlet />
    </div>
  );
}

export default EmployeePage;
