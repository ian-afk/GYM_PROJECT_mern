import './home.css';
export default function App() {
  return (
    <>
      <Home />
      <Footer />
    </>
  );
}

function Nav() {
  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li>
          Operations
          <ul>
            <li>Employees</li>
            <li>Client</li>
            <li>Gym branches</li>
            <li>Members</li>
            <li>Payments</li>
            <li>Generate Report</li>
            <li>Schedules</li>
          </ul>
        </li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </nav>
  );
}

function Home() {
  return (
    <>
      <Nav />
      <h1>El amagros EL</h1>
      <Main />
    </>
  );
}

function Main() {
  return (
    <main>
      <section className="bg"></section>
    </main>
  );
}

function Footer() {
  return (
    <foote>
      <p>
        © Copyright 2023 El Amagros EL, Inc.All rights reserved. Various
        trademarks held by their respective owners. <u>elAmagrosel.com</u>{' '}
        Bulacan bulacan 51234
      </p>
      <nav>
        <ul>
          <li>Legal</li>
          <li>Terms of Service</li>
          <li>Privacy Information</li>
          <li>Responsible Disclosure</li>
          <li>Trust</li>
          <li>Contact</li>
          <li>Cookie Preferencess</li>
        </ul>
      </nav>
    </foote>
  );
}
