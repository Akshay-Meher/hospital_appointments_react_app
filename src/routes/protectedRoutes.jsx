import { lazy } from 'react';
import DoctorAppointmentPage from '../pages/DoctorAppointmentPage';

const Dashboard = lazy(() => import('../pages/Dashboard'));

export const protectedRoutes = [
  {
    path: '/home',
    element: Dashboard,
  },
  {
    path: "/appointment",
    element: DoctorAppointmentPage
  }
]; 