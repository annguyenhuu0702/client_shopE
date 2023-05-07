import { Col, Row } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { castToVND } from '../../../utils';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { IVariantValue } from '../../../types/variantValue';
import { variantValueApi } from '../../../apis/variantValueApi';

const ContentFilter: React.FC = () => {
  const [variant, setVariant] = useState<any>();
  // const [sizes, setSizes] = useState<IVariantValue[]>([]);
  // const [colors, setColors] = useState<IVariantValue[]>([]);

  const [activeSize, setActiveSize] = useState<string>('');
  const [activeColor, setActiveColor] = useState<string>('');
  const [activePrice, setActivePrice] = useState<string>('');

  const [filter, setFilter] = useState<{}>({});

  const priceFilter = [
    {
      label: '0 ₫ - 200.000 ₫',
      min: 0,
      max: 200000,
    },
    {
      label: '200.000 ₫ - 400.000 ₫',
      min: 200000,
      max: 400000,
    },
    {
      label: '400.000 ₫ - 600.000 ₫',
      min: 4000000,
      max: 600000,
    },
    {
      label: '600.000 ₫ - 800.000 ₫',
      min: 600000,
      max: 800000,
    },
    {
      label: '800.000 ₫ - 1.000.000 ₫',
      min: 800000,
      max: 1000000,
    },
    {
      label: '1.000.000 ₫ - 1.600.000 ₫',
      min: 1000000,
      max: 1600000,
    },
    {
      label: '> 1.600.000 ₫',
      min: 1600000,
    },
  ];

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await variantValueApi.getAll();
        const { data } = res.data;
        const status = res.status;
        if (status === 200) {
          setVariant(data);
        }
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(variant);

  // render color
  const getVariantColors = useMemo(() => {
    if (variant) {
      return variant.rows
        .reverse()
        .filter((item: IVariantValue) => item.variantId === 2);
    }
  }, [variant]);

  // render size
  const getVariantSizes = useMemo(() => {
    if (variant) {
      return variant.rows.filter((item: IVariantValue) => item.variantId === 1);
    }
  }, [variant]);

  const handleActiveColor = (name: string) => {
    setActiveColor(name);
  };

  const handleActiveSize = (name: string) => {
    setActiveSize(name);
  };

  const handleActivePrice = (name: string) => {
    setActivePrice(name);
  };

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
                {priceFilter &&
                  priceFilter.map((item) => {
                    return (
                      <li
                        className={`text-2xl mb-6 py-4 cursor-pointer rounded-2xl ${
                          item.label === activePrice
                            ? 'bg-name-product text-white'
                            : 'text-name-product bg-bg-layout-profile'
                        }`}
                        onClick={() => {
                          handleActivePrice(item.label);
                        }}
                      >
                        <span className="ml-8">{item.label}</span>
                      </li>
                    );
                  })}
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
                {getVariantColors?.map((item: IVariantValue) => {
                  return (
                    <li
                      className={`text-2xl mb-6 py-4 px-6 mr-4 cursor-pointer ${
                        item.name === activeColor
                          ? 'bg-name-product text-white'
                          : 'bg-bg-layout-profile text-name-product'
                      } `}
                      key={item.id}
                      onClick={() => {
                        handleActiveColor(item.name);
                      }}
                    >
                      <span className="">{item.name}</span>
                    </li>
                  );
                })}
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
                {getVariantSizes?.map((item: IVariantValue) => {
                  return (
                    <li
                      className={`text-2xl mb-6 py-4 px-6 mr-4 cursor-pointer ${
                        item.name === activeSize
                          ? 'bg-name-product text-white'
                          : 'bg-bg-layout-profile text-name-product'
                      } `}
                      key={item.id}
                      onClick={() => {
                        handleActiveSize(item.name);
                      }}
                    >
                      <span>{item.name}</span>
                    </li>
                  );
                })}
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
