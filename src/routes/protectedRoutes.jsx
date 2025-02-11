import { lazy } from 'react';
import DoctorAppointmentPage from '../pages/DoctorAppointmentPage';
import DoctorsListing from '../pages/DoctorsListing';

const Dashboard = lazy(() => import('../pages/Dashboard'));

export const protectedRoutes = [
  {
    path: '/home',
    element: Dashboard,
  },
  {
    path: "/appointment",
    element: DoctorAppointmentPage
  },
  {
    path: "doctors",
    element: DoctorsListing
  }

]; 