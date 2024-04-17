import styles from './Logo.module.css';
export default function Logo() {
  return (
    <>
      <div className={styles.imgHolder}>
        <img src="../public/first-proto-white.png" alt="elamgros-logo" />
      </div>
    </>
  );
}
