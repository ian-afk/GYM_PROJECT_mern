import Header from './Header';
import Loginout from '../../components/Loginout';
import Footer from './Footer';
import Main from './Main';

export default function Home() {
  return (
    <>
      <Loginout />
      <h1>El amagros EL</h1>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
