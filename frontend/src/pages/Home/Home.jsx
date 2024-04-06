import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import styles from './Home.module.css';
export default function Home() {
  return (
    <div className={styles.mainHomeContainer}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
