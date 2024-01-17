import Header from './Header';
import Nav from '../../components/Nav';
import Loginout from '../../components/Loginout';
import Footer from './Footer';

export default function Home() {
  return (
    <>
      <Loginout />
      <h1>El amagros EL</h1>
      <Header />
      <Footer />
    </>
  );
}
