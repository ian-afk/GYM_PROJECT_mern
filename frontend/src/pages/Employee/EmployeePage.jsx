import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from '../Employee/EmployeePage.module.css';
import Footer from '../../components/Footer';

function EmployeePage() {
  return (
    <div className={styles.empPageContainer}>
      <div className={styles.empContainer}>
        <div>
          <Nav />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EmployeePage;
