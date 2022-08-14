import { lazy } from 'react';

import { DashboardLayout, DefaultLayout } from '../layouts';
import { typeRoute } from '../types/route';

const HomePage = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const User = lazy(() => import('../dashboard/pages/User'));
const Statistical = lazy(() => import('../dashboard/pages/Statistical'));
const Profile = lazy(() => import('../dashboard/pages/Profile'));
const Category = lazy(() => import('../dashboard/pages/Category'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

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

//admin
export const privateRoute: typeRoute[] = [
  {
    path: '/admin',
    element: Statistical,
    layout: DashboardLayout,
  },
  {
    path: '/admin/user',
    element: User,
    layout: DashboardLayout,
  },
  {
    path: '/admin/profile',
    element: Profile,
    layout: DashboardLayout,
  },
  {
    path: '/admin/category',
    element: Category,
    layout: DashboardLayout,
  },
];
