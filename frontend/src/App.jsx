import './home.css';
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  Outlet,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home/Home';

import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeView from './pages/Employee/EmployeeView';
import Nav from './components/Nav';
import NotFound from './components/NotFoundPage';
import EmployeeCreate from './pages/Employee/EmployeeCreate';
import ClientList from './pages/client/ClientList';
export default function App() {
  const AppLayout = () => (
    <>
      <Nav />
      <Outlet />
    </>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />}></Route>

        <Route path="/employees" element={<EmployeeList />}></Route>
        <Route path="/employees/:id" element={<EmployeeView />}></Route>
        <Route path="/employees/create" element={<EmployeeCreate />}></Route>

        <Route path="/clients" element={<ClientList />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
