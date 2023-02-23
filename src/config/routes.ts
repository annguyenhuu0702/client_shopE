export const routes = {
  home: '/',
  register: '/register',
  login: '/login',
  profile: '/account',
  myOrder: '/account/my-order',
  changePassword: '/account/change-password',
  accumulatedPoints: '/account/accumulated-points',
  favoriteProduct: '/account/favorite-product',
  productDetail: '/:slug',
  cart: '/cart',
  categoryPage: '/category',
  productCategory: '/product-category',
  checkOut: '/checkout',

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
};

// export default routes;
