import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: Dashboard,
  }
]; 