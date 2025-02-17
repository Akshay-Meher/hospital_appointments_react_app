import { lazy } from 'react';
import AboutPage from '../pages/AboutPage';

const Dashboard = lazy(() => import('../pages/Dashboard'));

export const normalRoutes = [
    {
        path: '/about',
        element: AboutPage,
    },

]; 