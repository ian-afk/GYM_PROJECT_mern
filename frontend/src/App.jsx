import './home.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

import EmployeeList from './pages/Employee/EmployeeList';
export default function App() {
  return (
    <>
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/employees" element={<EmployeeList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
