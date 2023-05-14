import React from 'react';
import { AiOutlineBook, AiOutlineHeart, AiOutlineLock } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { TbGift } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../../apis/authApi';
import { routes } from '../../../config/routes';
import { authActions, authSelector } from '../../../redux/slice/authSlice';
import { cartActions } from '../../../redux/slice/cartSlice';

const InfoUser: React.FC = () => {
  const { user } = useSelector(authSelector);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = [
    {
      icon: <BiUserCircle />,
      name: 'Tài khoản của tôi',
      path: routes.profile,
    },
    {
      icon: <AiOutlineBook />,
      name: 'Đơn hàng của tôi',
      path: routes.myOrder,
    },
    {
      icon: <AiOutlineLock />,
      name: 'Đổi mật khẩu',
      path: routes.changePassword,
    },
    {
      icon: <TbGift />,
      name: 'Điểm tích lũy',
      path: routes.accumulatedPoints,
    },
    {
      icon: <AiOutlineHeart />,
      name: 'Sản phẩm yêu thích',
      path: routes.favoriteProduct,
    },
  ];
  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
    dispatch(cartActions.setCart());
    navigate(routes.home);
  };
  return (
    <section className="max-sm:mt-24 bg-white">
      <div className="p-8">
        <div className="text-center mb-8">
          {user.user?.avatar ? (
            <img
              className="w-40 h-40 rounded-full"
              src={user.user?.avatar}
              alt=""
            />
          ) : (
            <img
              className="w-40 h-40"
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1677655323/canifa/user_jmlojj.jpg"
              alt="avatar"
            />
          )}
        </div>
        <div className="text-center mb-2">
          <span>{user.user?.fullname}</span>
        </div>
        <div
          onClick={() => {
            handleLogout();
          }}
        >
          <button
            type="submit"
            className=" w-full bg-btn-order flex items-center justify-center py-2 px-12 text-white text-xl border-none outline-none cursor-pointer rounded-2xl"
          >
            Đăng xuất
          </button>
        </div>
      </div>
      <div>
        <ul className="m-0 list-none pb-32 max-sm:pb-8">
          {menu &&
            menu.map((item) => {
              return (
                <li
                  className={`cursor-pointer py-4 pl-8 hover:bg-item-profile ${
                    location.pathname === item.path
                      ? `bg-item-profile hover:text-btn-order`
                      : ``
                  }`}
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <Link
                    to=""
                    className={`flex items-center text-2xl hover:text-btn-order ${
                      location.pathname === item.path
                        ? `text-btn-order hover:text-btn-order`
                        : ``
                    }`}
                  >
                    <span className="flex mr-2 text-4xl">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default InfoUser;
