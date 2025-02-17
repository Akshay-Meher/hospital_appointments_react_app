import { lazy } from 'react';
import DoctorAppointmentPage from '../pages/DoctorAppointmentPage';
import DoctorsListing from '../pages/DoctorsListing';
import ProfilePage from '../pages/ProfilePage';
import DoctorDetails from '../pages/DoctorDetails';
import MyAppointments from '../pages/MyAppointments';
import AboutPage from '../pages/AboutPage';

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
    path: "/my-appointments",
    element: MyAppointments
  },
  {
    path: "/doctors",
    element: DoctorsListing
  },
  {
    path: "/doctor/:id",
    element: DoctorAppointmentPage
  },
  {
    path: "/profile",
    element: ProfilePage
  },


]; 