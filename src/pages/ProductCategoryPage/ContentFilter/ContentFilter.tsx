import { Col, Row } from 'antd';
import React from 'react';
import { castToVND } from '../../../utils';
import { AiOutlineDelete } from 'react-icons/ai';

const ContentFilter: React.FC = () => {
  return (
    <section className="w-1000 px-6 pt-6">
      <Row className="border-solid border-0 border-b-2 border-b-bg-layout-profile">
        <Col xl={8}>
          <div className="h-full pr-10 border-solid border-0 border-r-2 border-r-bg-layout-profile">
            <div className="flex justify-between mb-10">
              <span className="text-3xl font-bold">Khoảng giá</span>
              <span className="text-2xl cursor-pointer hover:text-red-600">
                Mặc định
              </span>
            </div>
            <div>
              <ul className="list-none mb-0">
                <li className="text-2xl mb-6 py-4 cursor-pointer rounded-2xl bg-name-product text-white">
                  <span className="ml-8">
                    {castToVND(0)} - {castToVND(200000)}
                  </span>
                </li>
                <li className="text-2xl mb-6 py-4 cursor-pointer rounded-2xl bg-bg-layout-profile text-name-product">
                  <span className="ml-8">
                    {castToVND(200000)} - {castToVND(400000)}
                  </span>
                </li>
                <li className="text-2xl mb-6 py-4 cursor-pointer rounded-2xl bg-bg-layout-profile text-name-product">
                  <span className="ml-8">
                    {castToVND(400000)} - {castToVND(600000)}
                  </span>
                </li>
                <li className="text-2xl mb-6 py-4 cursor-pointer rounded-2xl bg-bg-layout-profile text-name-product">
                  <span className="ml-8">
                    {castToVND(600000)} - {castToVND(800000)}
                  </span>
                </li>
                <li className="text-2xl mb-6 py-4 cursor-pointer rounded-2xl bg-bg-layout-profile text-name-product">
                  <span className="ml-8">
                    {castToVND(800000)} - {castToVND(1000000)}
                  </span>
                </li>
                <li className="text-2xl mb-6 py-4 cursor-pointer rounded-2xl bg-bg-layout-profile text-name-product">
                  <span className="ml-8">
                    {castToVND(1000000)} - {castToVND(1600000)}
                  </span>
                </li>
                <li className="text-2xl mb-6 py-4 cursor-pointer rounded-2xl bg-bg-layout-profile text-name-product">
                  <span className="ml-8">
                    {'>'} {castToVND(1600000)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col xl={8}>
          <div className="h-full pl-10 pr-10 border-solid border-0 border-r-2 border-r-bg-layout-profile ">
            <div className="flex justify-between mb-10">
              <span className="text-3xl font-bold">Màu sắc</span>
              <span className="text-2xl cursor-pointer hover:text-red-600">
                Mặc định
              </span>
            </div>
            <div>
              <ul className="list-none mb-0 flex flex-wrap">
                <li className="text-2xl mb-6 p-4 mr-4 cursor-pointer bg-name-product text-white">
                  <span className="">Trắng</span>
                </li>
                <li className="text-2xl mb-6 p-4 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">Đỏ</span>
                </li>
                <li className="text-2xl mb-6 p-4 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">Vàng</span>
                </li>
                <li className="text-2xl mb-6 p-4 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">Lục</span>
                </li>
                <li className="text-2xl mb-6 p-4 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">Lam</span>
                </li>
                <li className="text-2xl mb-6 p-4 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">Xanh dương</span>
                </li>
                <li className="text-2xl mb-6 p-4 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">Tím</span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col xl={8}>
          <div className="h-full pl-10 pr-10 border-solid border-0 border-r-2 border-r-bg-layout-profile ">
            <div className="flex justify-between mb-10">
              <span className="text-3xl font-bold">Kích cỡ</span>
              <span className="text-2xl cursor-pointer hover:text-red-600">
                Mặc định
              </span>
            </div>
            <div>
              <ul className="list-none mb-0 flex flex-wrap">
                <li className="text-2xl mb-6 py-4 px-6 mr-4 cursor-pointer bg-name-product text-white">
                  <span className="">S</span>
                </li>
                <li className="text-2xl mb-6 py-4 px-6 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">M</span>
                </li>
                <li className="text-2xl mb-6 py-4 px-6 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">L</span>
                </li>
                <li className="text-2xl mb-6 py-4 px-6 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">XL</span>
                </li>
                <li className="text-2xl mb-6 py-4 px-6 mr-4 cursor-pointer bg-bg-layout-profile text-name-product">
                  <span className="">XXL</span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="pt-6">
        <Col xl={16}>
          <div className="pr-10">
            <ul className="list-none mb-0 flex flex-wrap">
              <li className="flex items-center text-2xl mb-6 mr-4 py-4 px-8 cursor-pointer bg-option-filter text-white">
                <span className="">Trắng</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Đỏ</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Vàng</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Lục</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Lam</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Xanh dương</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Tím</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Lam</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Xanh dương</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
              <li className="flex items-center text-2xl mb-6 mr-4 px-8 py-4 cursor-pointer bg-option-filter text-white">
                <span className="">Tím</span>
                <span className="flex items-center ml-4">
                  <AiOutlineDelete className="" />
                </span>
              </li>
            </ul>
          </div>
        </Col>
        <Col xl={8}>
          <div className="flex">
            <div className="w-60 mr-8">
              <button
                type="submit"
                className="w-full py-6 text-3xl border-none outline-none cursor-pointer bg-bg-layout-profile text-name-product font-semibold"
              >
                Xóa tất cả
              </button>
            </div>
            <div className="w-60">
              <button
                type="submit"
                className="w-full py-6 text-3xl border-none outline-none cursor-pointer  text-white bg-name-product"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ContentFilter;
