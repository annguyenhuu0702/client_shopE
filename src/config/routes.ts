const routes = {
  home: '/',
  register: '/register',
  login: '/login',
  productDetail: '/:slug',

  // admin
  admin: '/admin',
  userAdmin: '/admin/user',
  profileAdmin: '/admin/profile',
  categoryAdmin: '/admin/category',
  createCategoryAdmin: '/admin/category/create',
  editCategoryAdmin: '/admin/category/edit/:id',
  categoryTypeAdmin: '/admin/category-type',
};

export default routes;
