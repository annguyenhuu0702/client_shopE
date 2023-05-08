export const routes = {
  home: '/',
  register: '/register',
  login: '/login',
  fogotPassword: '/fogot-password',
  restPassword: '/reset-password/:id/:token',
  profile: '/account',
  myOrder: '/account/my-order',
  changePassword: '/account/change-password',
  accumulatedPoints: '/account/accumulated-points',
  favoriteProduct: '/account/favorite-product',
  productDetail: '/:slug',
  cart: '/cart',
  categoryPage: '/category/:slug',
  collectionPage: '/collection/:slug',
  productCategoryPage: '/product-category/:slug',
  checkOut: '/checkout',
  searchProduct: '/search',
  news: '/news',
  newsDetail: '/news/:slug',
  paymentSuccess: '/payment-success',

  // admin
  admin: '/admin',
  userAdmin: '/admin/user',
  profileAdmin: '/admin/profile',
  categoryAdmin: '/admin/category',
  createCategoryAdmin: '/admin/category/create',
  editCategoryAdmin: '/admin/category/edit/:id',
  collectionAdmin: '/admin/collection',
  createCollectionAdmin: '/admin/collection/create',
  editCollectionAdmin: '/admin/collection/edit/:id',
  productCategoryAdmin: '/admin/product-category',
  createProductCategoryAdmin: '/admin/product-category/create',
  editProductCategoryAdmin: '/admin/product-category/edit/:id',
  productAdmin: '/admin/product',
  createProductAdmin: '/admin/product/create',
  editProductAdmin: '/admin/product/edit/:id',
  inventoryAdmin: '/admin/inventory',
  commentAdmin: '/admin/comment',
  newsAdmin: '/admin/news',
  createNews: '/admin/news/create',
  editNews: '/admin/news/edit/:id',
  orderAdmmin: '/admin/order',
  promotionAdmin: '/admin/discount',
  sizeAdmin: '/admin/size',
  colorAdmin: '/admin/color',
  statisticalAdmin: '/admin/statistical',
};

// export default routes;
