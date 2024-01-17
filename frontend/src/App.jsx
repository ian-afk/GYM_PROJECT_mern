import './home.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeView from './pages/Employee/EmployeeView';
import Nav from './components/Nav';
import NotFound from './components/NotFoundPage';
import EmployeeCreate from './pages/Employee/EmployeeCreate';
export default function App() {
  return (
    <>
      {/* <Home /> */}

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/employees" element={<EmployeeList />}></Route>
          <Route path="/employees/:id" element={<EmployeeView />}></Route>
          <Route path="/employees/create" element={<EmployeeCreate />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
