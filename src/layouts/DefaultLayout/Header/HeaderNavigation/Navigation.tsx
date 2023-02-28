import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  categoryActions,
  categorySelector,
  categoryState,
} from '../../../../redux/slice/categorySlice';
import { category } from '../../../../types/category';
import { collection } from '../../../../types/collection';
import { productCategory } from '../../../../types/productCategory';
import { removeTextBetweenParentheses } from '../../../../utils';
import styles from './__navigation.module.scss';

const cx = classNames.bind(styles);

const HeaderNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const { categories }: categoryState = useSelector(categorySelector);
  useEffect(() => {
    dispatch(categoryActions.getAllCategory({ collections: true }));
  }, [dispatch]);

  return (
    <section className={cx('navigation')}>
      <div className={cx('menu')}>
        <ul className={cx('list-item')}>
          {categories &&
            [...categories.rows].reverse().map((category: category) => {
              return (
                <li className={cx('item')} key={category.id}>
                  <Link
                    to={`/${category.slug}`}
                    className={cx('group-category')}
                  >
                    {category.name}
                  </Link>
                  <Row
                    className={cx(
                      `${
                        category.collections.length > 0 ? 'block-category' : ''
                      }`
                    )}
                  >
                    {[...category.collections]
                      .reverse()
                      .map((collection: collection) => {
                        return (
                          <Col
                            xl={6}
                            className={cx('wrap-children')}
                            key={collection.id}
                          >
                            <Link
                              to={`/${collection.slug}`}
                              className={cx('category')}
                            >
                              {removeTextBetweenParentheses(collection.name)}
                            </Link>
                            <ul className={cx('child-category')}>
                              {[...collection.productCategories]
                                .reverse()
                                .map((item: productCategory) => {
                                  return (
                                    <li key={item.id}>
                                      <Link to={`/${item.slug}`}>
                                        {removeTextBetweenParentheses(
                                          item.name
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          </Col>
                        );
                      })}
                  </Row>
                </li>
              );
            })}
          {/* <li className={cx('item')}>
            <Link to="/" className={cx('group-category')}>
              Trang chủ
            </Link>
          </li>
          <li className={cx('item')}>
            <Link to="" className={cx('group-category')}>
              Sản phẩm mới
            </Link>
          </li>
          <li className={cx('item')}>
            <Link to="" className={cx('group-category')}>
              aaa
            </Link>
            <FontAwesomeIcon icon={faAngleDown} className={cx('icon')} />
            <div className={cx('block-category')}>
              <div style={{ display: 'flex', width: '60%' }}>
                <div className={cx('wrap-children')}>
                  <Link to="" className={cx('category')}>
                    aaa
                  </Link>
                  <ul className={cx('child-category')}>
                    <li>
                      <Link to="">aa</Link>
                    </li>
                  </ul>
                </div>
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
          </li> */}
        </ul>
      </div>
    </section>
  );
};

export default HeaderNavigation;
