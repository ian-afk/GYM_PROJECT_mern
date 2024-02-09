import styles from './Header.module.css';
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['logo-box']}>
        <img src="first proto2.png" alt="logo" className={styles.logo} />
      </div>
      <div className={styles['text-box']}>
        <h1 className={styles['heading-primary']}>
          <span className={styles['heading-primary-main']}>LIFESTYLE</span>
          <span className={styles['heading-primary-sub']}>
            Exceeds your limitation
          </span>
        </h1>
      </div>
    </header>
  );
}
