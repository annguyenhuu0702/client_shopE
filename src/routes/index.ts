import { lazy } from 'react';
import routes from '../config/routes';

import { DashboardLayout, DefaultLayout } from '../layouts';
import { route } from '../types/route';

const HomePage = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const User = lazy(() => import('../dashboard/pages/User'));
const Statistical = lazy(() => import('../dashboard/pages/Statistical'));
const Profile = lazy(() => import('../dashboard/pages/Profile'));
const Category = lazy(() => import('../dashboard/pages/Category'));
const FormCategory = lazy(
  () => import('../dashboard/pages/Category/FormCategory')
);
const CategoryType = lazy(() => import('../dashboard/pages/CategoryType'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const publicRoute: route[] = [
  {
    path: '*',
    element: NotFound,
    layout: null,
  },
  {
    path: routes.home,
    element: HomePage,
    layout: DefaultLayout,
  },
  {
    path: routes.register,
    element: Register,
    layout: DefaultLayout,
  },
  {
    path: routes.login,
    element: Login,
    layout: DefaultLayout,
  },
];

//admin
export const privateRoute: route[] = [
  {
    path: routes.admin,
    element: Statistical,
    layout: DashboardLayout,
  },
  {
    path: routes.userAdmin,
    element: User,
    layout: DashboardLayout,
  },
  {
    path: routes.profileAdmin,
    element: Profile,
    layout: DashboardLayout,
  },
  {
    path: routes.categoryAdmin,
    element: Category,
    layout: DashboardLayout,
  },
  {
    path: routes.createCategoryAdmin,
    element: FormCategory,
    layout: DashboardLayout,
  },
  {
    path: routes.editCategoryAdmin,
    element: FormCategory,
    layout: DashboardLayout,
  },
  {
    path: routes.categoryTypeAdmin,
    element: CategoryType,
    layout: DashboardLayout,
  },
];
