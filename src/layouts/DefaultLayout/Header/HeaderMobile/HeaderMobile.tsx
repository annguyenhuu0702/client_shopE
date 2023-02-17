import { Drawer, Form, Input } from 'antd';
import React, { useState } from 'react';
import { BsBag, BsList, BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const HeaderMobile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const { Search } = Input;

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleShowSearch = () => {
    setIsSearch(true);
  };

  const onSearch = (value: string) => console.log(value);
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
          <Link to="/">
            <img
              className="w-24 h-12"
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1661177083/canifa/logo_xju1y6.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="text-4xl">
          <div
            className="flex items-center"
            onClick={() => {
              navigate('/cart');
            }}
          >
            <BsSearch
              className="mr-6"
              onClick={() => {
                handleShowSearch();
              }}
            />
            <BsBag />
          </div>
        </div>
      </div>
      <>
        <Drawer placement="left" onClose={onClose} open={open} destroyOnClose>
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
            <div className="text-3xl pb-6 flex items-center">
              <span className="flex mr-3">
                <AiOutlineUser />
              </span>
              <Link to="/login">
                <span>Đăng nhập</span>
              </Link>
            </div>
            <div className="text-3xl pb-6 flex items-center">
              <span className="flex mr-3">
                <FaShippingFast />
              </span>
              <a href=" ">
                <span>Đơn hàng của tôi</span>
              </a>
            </div>
          </div>
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
