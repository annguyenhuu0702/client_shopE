import { lazy } from 'react';
import { routes } from '../config/routes';
import {
  CartLayout,
  DashboardLayout,
  DefaultLayout,
  ProfileLayout,
} from '../layouts';
import { IRoute } from '../types/route';

const Coupon = lazy(() => import('../dashboard/pages/Coupon/Coupon'));
const ProductOutStock = lazy(
  () => import('../dashboard/pages/ProductOutStock/ProductOutStock')
);
const HomePage = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const FogotPassword = lazy(() => import('../pages/FogotPassword'));
const ResetPassword = lazy(
  () => import('../pages/FogotPassword/ResetPassword')
);
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const AccumulatedPoint = lazy(
  () => import('../pages/ProfilePage/AccumulatedPoint')
);
const ChangePasswordUser = lazy(
  () => import('../pages/ProfilePage/ChangePasswordUser')
);
const FavoriteProduct = lazy(
  () => import('../pages/ProfilePage/FavoriteProduct')
);
const MyOrder = lazy(() => import('../pages/ProfilePage/MyOrder'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetail'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const ProductCategoryPage = lazy(() => import('../pages/ProductCategoryPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckOutPage = lazy(() => import('../pages/CheckOutPage'));
const SearchProduct = lazy(() => import('../pages/SearchProductPage'));
const NewsPage = lazy(() => import('../pages/NewsPage'));
const NewsDetailPage = lazy(() => import('../pages/NewsDetailPage'));
const PaymentSuccessPage = lazy(() => import('../pages/PaymentSuccess'));

// admin
const User = lazy(() => import('../dashboard/pages/User'));
const Dashboard = lazy(() => import('../dashboard/pages/Home'));
const Profile = lazy(() => import('../dashboard/pages/Profile'));
const Category = lazy(() => import('../dashboard/pages/Category'));
const FormCategory = lazy(
  () => import('../dashboard/pages/Category/FormCategory')
);
const Colletion = lazy(() => import('../dashboard/pages/Collection'));
const FormCollection = lazy(
  () => import('../dashboard/pages/Collection/FormCollection')
);
const ProductCategory = lazy(
  () => import('../dashboard/pages/ProductCategory')
);
const FormProductCategory = lazy(
  () => import('../dashboard/pages/ProductCategory/FormProductCategory')
);
const ProductAdmin = lazy(() => import('../dashboard/pages/Product'));
const FormProduct = lazy(
  () => import('../dashboard/pages/Product/FormProduct')
);
const Comment = lazy(() => import('../dashboard/pages/Comment'));
const NewsAdmin = lazy(() => import('../dashboard/pages/News'));
const FormNews = lazy(() => import('../dashboard/pages/News/FormNews'));
const Order = lazy(() => import('../dashboard/pages/Order'));
const Promotion = lazy(() => import('../dashboard/pages/Promotion'));
const InventoryAdmin = lazy(() => import('../dashboard/pages/Inventory'));
const Size = lazy(() => import('../dashboard/pages/Size'));
const Color = lazy(() => import('../dashboard/pages/Color'));
const Statistical = lazy(() => import('../dashboard/pages/Statistical'));

const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const publicRoute: IRoute[] = [
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
    layout: null,
  },
  {
    path: routes.login,
    element: Login,
    layout: null,
  },
  {
    path: routes.fogotPassword,
    element: FogotPassword,
    layout: null,
  },
  {
    path: routes.restPassword,
    element: ResetPassword,
    layout: null,
  },
  {
    path: routes.profile,
    element: ProfilePage,
    layout: ProfileLayout,
  },
  {
    path: routes.accumulatedPoints,
    element: AccumulatedPoint,
    layout: ProfileLayout,
  },
  {
    path: routes.myOrder,
    element: MyOrder,
    layout: ProfileLayout,
  },
  {
    path: routes.changePassword,
    element: ChangePasswordUser,
    layout: ProfileLayout,
  },
  {
    path: routes.favoriteProduct,
    element: FavoriteProduct,
    layout: ProfileLayout,
  },
  {
    path: routes.productDetail,
    element: ProductDetailPage,
    layout: DefaultLayout,
  },
  {
    path: routes.categoryPage,
    element: CategoryPage,
    layout: DefaultLayout,
  },
  {
    path: routes.collectionPage,
    element: ProductCategoryPage,
    layout: DefaultLayout,
  },
  {
    path: routes.productCategoryPage,
    element: ProductCategoryPage,
    layout: DefaultLayout,
  },
  {
    path: routes.cart,
    element: CartPage,
    layout: CartLayout,
  },
  {
    path: routes.checkOut,
    element: CheckOutPage,
    layout: CartLayout,
  },
  {
    path: routes.searchProduct,
    element: SearchProduct,
    layout: DefaultLayout,
  },
  {
    path: routes.news,
    element: NewsPage,
    layout: DefaultLayout,
  },
  {
    path: routes.newsDetail,
    element: NewsDetailPage,
    layout: DefaultLayout,
  },
  {
    path: routes.paymentSuccess,
    element: PaymentSuccessPage,
    layout: DefaultLayout,
  },
];

//admin
export const privateRoute: IRoute[] = [
  {
    path: routes.admin,
    element: Dashboard,
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
    path: routes.collectionAdmin,
    element: Colletion,
    layout: DashboardLayout,
  },
  {
    path: routes.createCollectionAdmin,
    element: FormCollection,
    layout: DashboardLayout,
  },
  {
    path: routes.editCollectionAdmin,
    element: FormCollection,
    layout: DashboardLayout,
  },
  {
    path: routes.productCategoryAdmin,
    element: ProductCategory,
    layout: DashboardLayout,
  },
  {
    path: routes.createProductCategoryAdmin,
    element: FormProductCategory,
    layout: DashboardLayout,
  },
  {
    path: routes.editProductCategoryAdmin,
    element: FormProductCategory,
    layout: DashboardLayout,
  },
  {
    path: routes.productAdmin,
    element: ProductAdmin,
    layout: DashboardLayout,
  },
  {
    path: routes.createProductAdmin,
    element: FormProduct,
    layout: DashboardLayout,
  },
  {
    path: routes.editProductAdmin,
    element: FormProduct,
    layout: DashboardLayout,
  },
  {
    path: routes.inventoryAdmin,
    element: InventoryAdmin,
    layout: DashboardLayout,
  },
  {
    path: routes.commentAdmin,
    element: Comment,
    layout: DashboardLayout,
  },
  {
    path: routes.newsAdmin,
    element: NewsAdmin,
    layout: DashboardLayout,
  },
  {
    path: routes.createNews,
    element: FormNews,
    layout: DashboardLayout,
  },
  {
    path: routes.editNews,
    element: FormNews,
    layout: DashboardLayout,
  },
  {
    path: routes.orderAdmmin,
    element: Order,
    layout: DashboardLayout,
  },
  {
    path: routes.sizeAdmin,
    element: Size,
    layout: DashboardLayout,
  },
  {
    path: routes.colorAdmin,
    element: Color,
    layout: DashboardLayout,
  },
  {
    path: routes.promotionAdmin,
    element: Promotion,
    layout: DashboardLayout,
  },
  {
    path: routes.statisticalAdmin,
    element: Statistical,
    layout: DashboardLayout,
  },

  {
    path: '/inventory/product-out-stock',
    element: ProductOutStock,
    layout: DashboardLayout,
  },

  {
    path: '/admin/coupon',
    element: Coupon,
    layout: DashboardLayout,
  },
];
