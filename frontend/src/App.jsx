import './home.css';
import {
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
import ClientView from './pages/client/ClientView';
import ClientCreate from './pages/client/ClientCreate';
import TrainerList from './pages/trainer/TrainerList';
import TrainerView from './pages/trainer/TrainerView';
import TrainerCreate from './pages/trainer/TrainerCreate';
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
        <Route path="/clients/:id" element={<ClientView />}></Route>
        <Route path="/clients/create" element={<ClientCreate />}></Route>

        <Route path="/trainers" element={<TrainerList />}></Route>
        <Route path="/trainers/:id" element={<TrainerView />}></Route>
        <Route path="/trainers/create" element={<TrainerCreate />}></Route>
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
