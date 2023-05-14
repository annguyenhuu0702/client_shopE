import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';
import { authSelector } from '../../redux/slice/authSlice';
import { cartActions } from '../../redux/slice/cartSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  useEffect(() => {
    dispatch(
      cartActions.getByUser({
        token: user.accessToken,
        dispatch,
      })
    );
  }, [dispatch, user.accessToken]);
  return (
    <section className="flex items-center justify-between px-20 py-10 border-solid border-0 border-b-2 border-border-layout-cart max-sm:px-6">
      <div className="flex items-center">
        <Link to={routes.home}>
          <img
            className="w-32"
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1661177083/canifa/logo_xju1y6.svg"
            alt="logo"
          />
        </Link>
        <h4 className="m-0 ml-8 font-bold uppercase text-name-product max-sm:text-base">
          Thanh toán đơn hàng
        </h4>
      </div>
      <div className="flex">
        <Link
          to="/"
          className="text-name-product uppercase text-2xl font-semibold border-solid border-0 border-b-2 border-black cursor-pointer max-sm:text-base"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </section>
  );
};

export default Header;
