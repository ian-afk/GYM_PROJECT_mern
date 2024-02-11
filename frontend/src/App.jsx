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
import ClientPage from './pages/client/ClientPage';
import ClientView from './pages/client/ClientView';
import ClientCreate from './pages/client/ClientCreate';
import TrainerPage from './pages/trainer/TrainerPage';
import TrainerList from './pages/trainer/TrainerList';
import TrainerView from './pages/trainer/TrainerView';
import TrainerCreate from './pages/trainer/TrainerCreate';
import SchedulePage from './pages/schedule/SchedulePage';
import ScheduleList from './pages/schedule/ScheduleList';
import ScheduleCreate from './pages/schedule/ScheduleCreate';
import ScheduleView from './pages/schedule/ScheduleView';
import GymPage from './pages/gymbranches/GymPage';
import GymList from './pages/gymbranches/GymList';
import GymView from './pages/gymbranches/GymView';
import GymCreate from './pages/gymbranches/GymCreate';
import EmployeePage from './pages/Employee/EmployeePage';
import AuthPage from './pages/auth/AuthPage';
import Login from './pages/auth/Login';

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

        <Route path="employees" element={<EmployeePage />}>
          <Route index element={<EmployeeList />} />
          <Route path="create" element={<EmployeeCreate />} />
          <Route path=":id" element={<EmployeeView />} />
        </Route>

        <Route path="/clients" element={<ClientPage />}>
          <Route index element={<ClientList />} />
          <Route path="/clients/:id" element={<ClientView />} />
          <Route path="/clients/create" element={<ClientCreate />} />
        </Route>

        <Route path="/trainers" element={<TrainerPage />}>
          <Route index element={<TrainerList />} />
          <Route path="/trainers/:id" element={<TrainerView />} />
          <Route path="/trainers/create" element={<TrainerCreate />} />
        </Route>

        <Route path="/schedules" element={<SchedulePage />}>
          <Route index element={<ScheduleList />} />
          <Route path="/schedules/:id" element={<ScheduleView />} />
          <Route path="/schedules/create" element={<ScheduleCreate />} />
        </Route>

        <Route path="/gymbranches" element={<GymPage />}>
          <Route index element={<GymList />} />
          <Route path="/gymbranches/create" element={<GymCreate />} />
          <Route path="/gymbranches/:id" element={<GymView />} />
        </Route>

        <Route path="/user" element={<AuthPage />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
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
