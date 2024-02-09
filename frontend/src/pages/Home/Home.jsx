import Header from './Header';
import Loginout from '../../components/Loginout';
import Footer from './Footer';
import Main from './Main';
import styles from './home.module.css';
export default function Home() {
  return (
    <>
      <Loginout />
      <Header />
      <Main />
      <Footer />
    </>
  );
}
