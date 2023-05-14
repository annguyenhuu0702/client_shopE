import { Badge, Drawer, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsBag, BsList, BsSearch } from 'react-icons/bs';
import { FaRegRegistered } from 'react-icons/fa';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { routes } from '../../../../config/routes';
import {
  categoryActions,
  categorySelector,
} from '../../../../redux/slice/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelector } from '../../../../redux/slice/authSlice';
import { authApi } from '../../../../apis/authApi';
import { cartSelector } from '../../../../redux/slice/cartSlice';

const HeaderMobile: React.FC = () => {
  const dispatch = useDispatch();
  const { categoriesClient } = useSelector(categorySelector);
  const { user } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // show drawer list bên trái
  const [open, setOpen] = useState(false);

  // show drawer search
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const { Search } = Input;

  const [form] = Form.useForm();

  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleShowSearch = () => {
    setIsSearch(true);
  };

  // search product
  const onSearch = (value: string) => {
    const params = { keyword: value };
    let queryString = new URLSearchParams(params).toString();
    if (queryString !== '') {
      queryString = '?' + queryString;
    }
    if (value !== '') {
      navigate(`${routes.searchProduct}${queryString}`);
    }
  };

  // tính tổng sản phẩm trong giỏ hàng
  const totalProduct = () => {
    let totalProduct =
      cart &&
      cart.cartItems.reduce(
        (prev, currentValue) => prev + currentValue.quantity,
        0
      );
    return totalProduct || 0;
  };

  // change page sẽ tắt drawer
  useEffect(() => {
    setOpen(false);
    setIsSearch(false);
  }, [location.pathname, searchParams]);

  // lấy category
  useEffect(() => {
    dispatch(categoryActions.getAllCategoryClient({ collections: true }));
  }, [dispatch]);

  return (
    <div className="hidden max-sm:block fixed bg-white w-full z-50">
      <div className="flex justify-between items-center px-4 py-6">
        <div
          className="text-4xl flex"
          onClick={() => {
            showDrawer();
          }}
        >
          <BsList />
        </div>
        <div>
          <Link to={routes.home}>
            <img
              className="w-24 h-12"
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1661177083/canifa/logo_xju1y6.svg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="text-4xl">
          <div className="flex items-center">
            <BsSearch
              className="mr-8"
              onClick={() => {
                handleShowSearch();
              }}
            />
            <div className="pr-2">
              <Badge count={totalProduct()} className="w-full h-full">
                <BsBag
                  className="w-10 h-10"
                  onClick={() => {
                    navigate(routes.cart);
                  }}
                />
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <>
        <Drawer
          placement="left"
          onClose={onClose}
          open={open}
          destroyOnClose={true}
        >
          {!user.user ? (
            <div className="border-solid border-0 border-b-2 border-border-mobile flex justify-between">
              <div className="text-3xl pb-6 flex items-center">
                <span className="flex items-center mr-3">
                  <AiOutlineLogin />
                </span>
                <Link to={routes.login}>
                  <span>Đăng nhập</span>
                </Link>
              </div>
              <div className="text-3xl pb-6 flex items-center">
                <span className="flex items-center mr-3">
                  <FaRegRegistered />
                </span>
                <Link to={routes.register}>
                  <span>Đăng ký</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="border-solid border-0 border-b-2 border-border-mobile flex justify-between">
              <div className="pb-6">
                <Link
                  to={
                    user.user.role === 'admin' ? '/admin/profile' : '/account'
                  }
                  className="text-2xl w-64 line-clamp-1"
                >
                  Xin chào, <b>{user.user.fullname}</b>
                </Link>
              </div>
              <div>
                <Link
                  to={routes.home}
                  className="text-2xl"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Link>
              </div>
            </div>
          )}

          <ul className="list-none mt-8">
            {[...categoriesClient.rows].reverse().map((item) => {
              return (
                <li className="pb-8" key={item.id}>
                  <Link
                    to={`/category/${item.slug}`}
                    className="text-3xl uppercase font-bold"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Drawer>
      </>
      <>
        <Drawer
          title="Tìm kiếm sản phẩm"
          placement="right"
          onClose={() => {
            setIsSearch(false);
          }}
          open={isSearch}
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            autoComplete="off"
            size="large"
          >
            <Form.Item>
              <Search
                allowClear
                size="large"
                placeholder="Nhập sản phẩm bạn cần tìm"
                onSearch={onSearch}
                enterButton
              />
            </Form.Item>
          </Form>
        </Drawer>
      </>
    </div>
  );
};

export default HeaderMobile;
