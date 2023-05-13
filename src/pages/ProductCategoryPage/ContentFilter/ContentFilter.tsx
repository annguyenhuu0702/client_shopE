import { Col, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { variantValueApi } from '../../../apis/variantValueApi';
import { IVariantValue } from '../../../types/variantValue';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClosePopup: () => void;
  min: number;
  max: number;
  sizesId: string;
  colorsId: string;
  handleFilter: (obj: any) => void;
}

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

const ContentFilter: React.FC<Props> = ({
  onClosePopup,
  min,
  max,
  colorsId,
  sizesId,
  handleFilter,
}) => {
  const [variant, setVariant] = useState<any>();

  const [activePrice, setActivePrice] = useState<string>(() => {
    let data = priceFilter.find((item) => item.min === min && item.max === max);
    if (data) {
      return data.label;
    }
    return '';
  });
  const [activeSize, setActiveSize] = useState<number[]>([]);
  const [activeColor, setActiveColor] = useState<number[]>([]);

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

  const handleActiveColor = (id: number) => {
    const newColors = [...activeColor];
    const findIndex = activeColor.findIndex((item) => item === id);
    if (findIndex === -1) {
      newColors.push(id);
    } else {
      newColors.splice(findIndex, 1);
    }
    setActiveColor(newColors);
  };

  const handleActiveSize = (id: number) => {
    const newSizes = [...activeSize];
    const findIndex = activeSize.findIndex((item) => item === id);
    if (findIndex === -1) {
      newSizes.push(id);
    } else {
      newSizes.splice(findIndex, 1);
    }
    setActiveSize(newSizes);
  };

  const handleActivePrice = (name: string) => {
    setActivePrice(name);
  };

  // xóa option thì set state rỗng hết
  const handleDeleteOption = () => {
    setActiveColor([]);
    setActiveSize([]);
    setActivePrice('');
  };

  const handleFilterProduct = () => {
    const newData: any = {};
    if (activePrice !== '') {
      let price = priceFilter.find((item) => item.label === activePrice);
      if (price) {
        newData.min = price.min;
        if (price.max) {
          newData.max = price.max;
        }
      }
    }
    if (activeSize.length > 0) {
      let join = activeSize.join(',');
      newData.sizesId = join;
    }
    if (activeColor.length > 0) {
      let join = activeColor.join(',');
      newData.colorsId = join;
    }
    handleFilter(newData);
    onClosePopup();
  };

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

  // f5 lại vẫn lấy active từ trên url
  useEffect(() => {
    if (variant) {
      let idSize = sizesId.split(',');
      let idColor = colorsId.split(',');
      setActiveColor(
        variant.rows
          .filter((variant: IVariantValue) => idColor.includes('' + variant.id))
          .map((item: IVariantValue) => item.id)
      );
      setActiveSize(
        variant.rows
          .filter((variant: IVariantValue) => idSize.includes('' + variant.id))
          .map((item: IVariantValue) => item.id)
      );
    }
  }, [colorsId, sizesId, variant]);

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
                        key={item.label}
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
                        activeColor.includes(item.id)
                          ? 'bg-name-product text-white'
                          : 'bg-bg-layout-profile text-name-product'
                      } `}
                      key={item.id}
                      onClick={() => {
                        handleActiveColor(item.id);
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
                        activeSize.includes(item.id)
                          ? 'bg-name-product text-white'
                          : 'bg-bg-layout-profile text-name-product'
                      } `}
                      key={item.id}
                      onClick={() => {
                        handleActiveSize(item.id);
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
              {activeColor.map((item) => {
                return (
                  <li
                    className="flex items-center text-2xl mb-6 mr-4 py-4 px-8 cursor-pointer bg-option-filter text-white"
                    key={item}
                  >
                    <span className="">
                      {
                        getVariantColors?.find(
                          (variant: any) => variant.id === item
                        )?.name
                      }
                    </span>
                    {/* <span className="flex items-center ml-4">
                      <AiOutlineDelete className="" />
                    </span> */}
                  </li>
                );
              })}

              {activeSize.map((item) => {
                return (
                  <li
                    className="flex items-center text-2xl mb-6 mr-4 py-4 px-8 cursor-pointer bg-option-filter text-white"
                    key={item}
                  >
                    <span className="">
                      {
                        getVariantSizes?.find(
                          (variant: any) => variant.id === item
                        )?.name
                      }
                    </span>
                    {/* <span className="flex items-center ml-4">
                      <AiOutlineDelete className="" />
                    </span> */}
                  </li>
                );
              })}

              {activePrice !== '' && (
                <li className="flex items-center text-2xl mb-6 mr-4 py-4 px-8 cursor-pointer bg-option-filter text-white">
                  <span className="">{activePrice}</span>
                  {/* <span className="flex items-center ml-4">
                    <AiOutlineDelete className="" />
                  </span> */}
                </li>
              )}
            </ul>
          </div>
        </Col>
        <Col xl={8}>
          <div className="flex">
            <div className="w-60 mr-8">
              <button
                type="submit"
                className="w-full py-6 text-3xl border-none outline-none cursor-pointer bg-bg-layout-profile text-name-product font-semibold"
                onClick={() => {
                  handleDeleteOption();
                }}
              >
                Xóa tất cả
              </button>
            </div>
            <div className="w-60">
              <button
                type="submit"
                className="w-full py-6 text-3xl border-none outline-none cursor-pointer  text-white bg-name-product"
                onClick={() => {
                  handleFilterProduct();
                }}
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
