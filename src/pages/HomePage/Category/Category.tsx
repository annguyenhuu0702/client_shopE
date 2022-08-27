import React, { useState } from 'react';
import styles from './__category.module.scss';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface category {
  img: string;
  name: string;
  path: string;
}

const Category: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const categoriesMen: category[] = [
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657612561/supersports/Running-Shoes_615a33fd-c7b9-40af-9857-9cbd34bde057_360x_roj0hx.png',
      name: 'Giày chạy bộ',
      path: '/giay-chay-bo-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657612555/supersports/Sneakers_1a2e86f3-bdac-4d24-b7c9-a2f6ec3f2db6_360x_shs7jr.png',
      name: 'Giày thời trang',
      path: '/giay-thoi-trang-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657693883/supersports/Training-Shoes_85248933-fedc-4417-8156-9e8cd31264d8_360x_xw0a2k.png',
      name: 'Giày luyện tập',
      path: '/giay-luyen-tap-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657693883/supersports/Training-Shoes_85248933-fedc-4417-8156-9e8cd31264d8_360x_xw0a2k.png',
      name: 'Xăng đan & dép',
      path: '/xang-dan-dep-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657693977/supersports/Caps_9c4f03d2-dcb6-4601-aaa4-e848f2fba6ee_360x_zytjrz.png',
      name: 'Mũ nón',
      path: '/giay-chay-bo-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694098/supersports/Sweatshirts_c62d9729-9ba9-406d-921d-33086a621dae_1512x_z9jxc9.png',
      name: 'Áo chui đầu',
      path: '/ao-chui-dau-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694102/supersports/TShirts_aa2fb522-d610-4b43-ad5d-6a210b0b7e28_360x_vwkhma.png',
      name: 'Áo thun',
      path: '/ao-thun-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694127/supersports/Jackets_a45cbad1-2a1c-4e87-9714-e451b00036fa_360x_wdqeij.png',
      name: 'Áo khoác',
      path: '/ao-khoac-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694186/supersports/Shorts-Pants_c9db596a-68c8-49b6-9052-a4753f093f95_360x_cit7yc.png',
      name: 'Quần ngắn',
      path: '/quan-ngan-nam',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694275/supersports/Backpacks_11da63eb-bde9-49a0-9cbb-8ab0077ff703_360x_im944a.png',
      name: 'Balo',
      path: '/tui-ba-lo-nam',
    },
  ];

  const categoriesWomen: category[] = [
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657612750/supersports/Running-Shoes_7fea76c6-0af0-40d6-8f4b-0268e86d97df_360x_ryd8ot.png',
      name: 'Giày chạy bộ',
      path: '/giay-chay-bo-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657612757/supersports/Sneakers_8076b111-00fd-498a-8f7d-6dd6f4fa1e91_360x_guenqe.png',
      name: 'Giày thời trang',
      path: '/giay-thoi-trang-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694717/supersports/Training-Shoes_df72842a-6a32-4ceb-90bd-3a4917626ad6_360x_p1tvhs.png',
      name: 'Giày luyện tập',
      path: '/giay-luyen-tap-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694726/supersports/Sandals_4d9c3efe-c3a7-4d72-a795-6d543a0f3f6b_360x_pmsu8x.png',
      name: 'Xăng đan & dép',
      path: '/xang-dan-dep-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694738/supersports/Caps_7dbb92eb-50ed-4b45-a0c4-7dd7b77dd4da_360x_bfcgki.png',
      name: 'Mũ nón',
      path: '/giay-chay-bo-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694828/supersports/Sweatshirts_b82e968d-212d-47e8-9363-9629d41c49af_360x_m21gkx.png',
      name: 'Áo chui đầu',
      path: '/ao-chui-dau-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694845/supersports/TShirts_a0e4e11b-29ec-4901-af4d-3abdd2d180ec_360x_ocfe6o.png',
      name: 'Áo thun',
      path: '/ao-thun-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694864/supersports/Jackets_5f941671-65f9-4c8e-a380-fabc260ef1e6_360x_pbeqd4.png',
      name: 'Áo khoác',
      path: '/ao-khoac-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694883/supersports/Shorts-Pants_6b5f031b-a541-4e0d-a30c-4ca15751eede_360x_ny5l1i.png',
      name: 'Quần ngắn',
      path: '/quan-ngan-nu',
    },
    {
      img: 'https://res.cloudinary.com/diot4imoq/image/upload/v1657694907/supersports/Backpacks_acecce5f-1ef0-42c3-a2c6-eaef1bd76004_360x_jh1dps.png',
      name: 'Balo',
      path: '/tui-ba-lo-nu',
    },
  ];

  return (
    <div className={cx('tabs-categories')}>
      <div className={cx('tabs-header')}>
        <h2
          className={cx('title', {
            active: isActive,
          })}
          onClick={() => {
            setIsActive(true);
          }}
        >
          NAM
        </h2>
        <h2
          className={cx('title', {
            active: !isActive,
          })}
          onClick={() => {
            setIsActive(false);
          }}
        >
          NỮ
        </h2>
      </div>
      <div className={cx('tabs-content')}>
        <div className={cx('content')}>
          {isActive &&
            categoriesMen.map((item: category, index: number) => {
              return (
                <Link to={item.path} className={cx('item')} key={index}>
                  <div className={cx('image')}>
                    <img src={item.img} alt="" />
                  </div>
                  <div className={cx('name')}>
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          {!isActive &&
            categoriesWomen.map((item: category, index: number) => {
              return (
                <Link to={item.path} className={cx('item')} key={index}>
                  <div className={cx('image')}>
                    <img src={item.img} alt="" />
                  </div>
                  <div className={cx('name')}>
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Category;
