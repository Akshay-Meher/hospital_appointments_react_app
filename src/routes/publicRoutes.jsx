import { lazy } from 'react';
import AboutPage from '../pages/About';
import Dashboard from '../pages/Dashboard';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/register',
    element: Register,
  },
  {
    path: '/about',
    element: AboutPage,
  },
  {
    path: '/home',
    element: Dashboard,
  },

]; 