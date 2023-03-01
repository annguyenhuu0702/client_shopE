import { Drawer, Form, Input } from 'antd';
import React, { useState } from 'react';
import { BsBag, BsList, BsSearch } from 'react-icons/bs';
import { AiOutlineLogin } from 'react-icons/ai';
import { FaRegRegistered } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../../config/routes';

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
            <BsBag
              onClick={() => {
                navigate(routes.cart);
              }}
            />
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
          <div className="border-solid border-0 border-b-2 border-border-mobile flex justify-between ">
            <div className="text-3xl pb-6 flex items-center">
              <span className="flex items-center mr-3">
                <AiOutlineLogin />
              </span>
              <Link to="/login">
                <span>Đăng nhập</span>
              </Link>
            </div>
            <div className="text-3xl pb-6 flex items-center">
              <span className="flex items-center mr-3">
                <FaRegRegistered />
              </span>
              <Link to="/register">
                <span>Đăng ký</span>
              </Link>
            </div>
          </div>
          <ul className="list-none mt-8">
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