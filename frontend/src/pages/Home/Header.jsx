import Nav from '../../components/Nav';
import styles from './Header.module.css';
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['logo-links']}>
        <img src="first-proto-white.png" alt="logo" className={styles.logo} />
        <Nav className={styles['logo-box']} />
      </div>
      <div className={styles['text-box']}>
        <h1 className={styles['heading-primary']}>
          <span className={styles['heading-primary-main']}>LIFESTYLE</span>
          <span className={styles['heading-primary-sub']}>
            Exceeds your limitation
          </span>
        </h1>
        <a className={styles.btn} href="#">
          Discover our Offer
        </a>
      </div>
    </header>
  );
}
