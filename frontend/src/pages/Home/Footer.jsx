import styles from './Footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © Copyright 2023 El Amagros EL, Inc.All rights reserved. Various
        trademarks held by their respective owners. <u>elAmagrosel.com</u>{' '}
        Bulacan bulacan 51234
      </p>
      <nav>
        <ul>
          <li>
            <a href="#">Legal</a>
          </li>
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Privacy Information</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Responsible Disclosure</a>
          </li>
          <li>
            <a href="#">Trust</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Cookie Preferencess</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
