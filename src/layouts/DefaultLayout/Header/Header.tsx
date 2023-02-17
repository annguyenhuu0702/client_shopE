import { Drawer } from 'antd';
import React, { useState } from 'react';
import { BsBag, BsList } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import HeaderTop from './HeaderTop';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    // <Affix offsetTop={0}>
    <main>
      <header style={{ background: '#12283e' }} className="max-sm:hidden">
        <div className="p-50">
          <div className="header-container">
            <HeaderTop />
          </div>
        </div>
      </header>
      <div className="hidden max-sm:block fixed bg-white w-full z-50">
        <div className="flex justify-between items-center px-4 py-6">
          <div
            className="text-4xl"
            onClick={() => {
              showDrawer();
            }}
          >
            <BsList />
          </div>
          <div>
            <img
              className="w-24 h-12"
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1661177083/canifa/logo_xju1y6.svg"
              alt=""
            />
          </div>
          <div className="text-4xl">
            <BsBag />
          </div>
        </div>
        <>
          <Drawer placement="left" onClose={onClose} open={open}>
            <ul className="list-none border-solid border-0 border-b-2 border-border-mobile">
              <li className="pb-8">
                <a href=" " className="text-3xl uppercase font-bold">
                  <span>Nam</span>
                </a>
              </li>
              <li className="pb-8">
                <a href=" " className="text-3xl uppercase font-bold">
                  <span>Nữ</span>
                </a>
              </li>
              <li className="pb-8">
                <a href=" " className="text-3xl uppercase font-bold">
                  <span>Bé trai</span>
                </a>
              </li>
              <li className="pb-8">
                <a href=" " className="text-3xl uppercase font-bold">
                  <span>Bé gái</span>
                </a>
              </li>
              <li className="pb-8">
                <a href=" " className="text-3xl uppercase font-bold">
                  <span>Canifa z</span>
                </a>
              </li>
            </ul>
            <div>
              <div>
                <span>
                  <AiOutlineUser />
                </span>
                <a href=" ">
                  <span>Đăng nhập</span>
                </a>
              </div>
              <div>
                <span>
                  <FaShippingFast />
                </span>
                <a href=" ">
                  <span>Đơn hàng của tôi</span>
                </a>
              </div>
            </div>
          </Drawer>
        </>
      </div>
    </main>
    // </Affix>
  );
};

export default Header;
