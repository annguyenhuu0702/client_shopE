import React, { useEffect } from 'react';
import styles from './__navigation.module.scss';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryActions } from '../../../../redux/slice/categorySlice';
import { typeCategory } from '../../../../types/category';

const cx = classNames.bind(styles);

const HeaderNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const category: typeCategory[] = useSelector(
    (state: any) => state.category.category.items
  );

  useEffect(() => {
    dispatch(categoryActions.fetchCategory());
  }, [dispatch]);

  return (
    <div className={cx('navigation')}>
      <div className={cx('menu')}>
        <ul className={cx('list-item')}>
          <li className={cx('item')}>
            <Link to="/" className={cx('group-category')}>
              Trang chủ
            </Link>
          </li>
          <li className={cx('item')}>
            <Link to="" className={cx('group-category')}>
              Sản phẩm mới
            </Link>
          </li>
          {category &&
            category.map((categories: any, index: number) => {
              return (
                <li className={cx('item')} key={index}>
                  <Link to={categories.slug} className={cx('group-category')}>
                    {categories.name}
                  </Link>
                  <FontAwesomeIcon icon={faAngleDown} className={cx('icon')} />
                  <div className={cx('block-category')}>
                    <div style={{ display: 'flex', width: '60%' }}>
                      {categories.children.map((item: any, index: number) => {
                        return (
                          <div className={cx('wrap-children')} key={index}>
                            <Link
                              to={item.slug}
                              key={index}
                              className={cx('category')}
                            >
                              {
                                item.name
                                  .toLowerCase()
                                  .split(item?.parent?.name.toLowerCase())[0]
                              }
                            </Link>
                            <ul className={cx('child-category')}>
                              {item.children.map((data: any, index: number) => {
                                return (
                                  <li key={index}>
                                    <Link to={data.slug}>
                                      {
                                        data.name.split(
                                          item?.parent?.name.toLowerCase()
                                        )[0]
                                      }
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <div className={cx('banner')}>
                      <img
                        src="https://res.cloudinary.com/diot4imoq/image/upload/v1657609158/supersports/490x185-M_720x_gcrmgv.jpg"
                        alt=""
                      />
                      <img
                        src="https://res.cloudinary.com/diot4imoq/image/upload/v1657609313/supersports/Banner_Hoka_menu_banner_720x_iidfc1.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className={cx('endow')}>
          <Link to="/uu-dai">Ưu đãi</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavigation;
