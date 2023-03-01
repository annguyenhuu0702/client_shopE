import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineBook, AiOutlineLock, AiOutlineHeart } from 'react-icons/ai';
import { TbGift } from 'react-icons/tb';
import { routes } from '../../../config/routes';

const InfoUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  return (
    <section className="max-sm:mt-24 bg-white">
      <div className="p-8">
        <div className="text-center mb-8">
          <img
            className="w-40 h-40"
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1659754217/supersports/28276948_2203483443212489_6296148341503783566_n_ypqfub.jpg"
            alt="avatar"
          />
        </div>
        <div className="text-center mb-2">
          <span>Nguyễn Hữu An</span>
        </div>
        <div>
          <button
            type="submit"
            className=" w-full bg-btn-order flex items-center justify-center py-2 px-12 text-white text-xl border-none outline-none cursor-pointer rounded-2xl"
          >
            Đăng xuất
          </button>
        </div>
      </div>
      <div>
        <ul className="m-0 list-none pb-16">
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
