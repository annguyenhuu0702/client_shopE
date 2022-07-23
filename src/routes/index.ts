import { lazy } from 'react';
import { DashboardLayout, DefaultLayout } from '../layouts';
import { typeRoute } from '../types/route';

const HomePage = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const User = lazy(() => import('../dashboard/page/User'));

export const publicRoute: typeRoute[] = [
  {
    path: '/',
    element: HomePage,
    layout: DefaultLayout,
  },
  {
    path: '/register',
    element: Register,
    layout: DefaultLayout,
  },
  {
    path: '/login',
    element: Login,
    layout: DefaultLayout,
  },
];

export const privateRoute: typeRoute[] = [
  {
    path: '/admin',
    element: User,
    layout: DashboardLayout,
  },
];
