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
import { ICategory } from '../../../../types/category';
import { ICollection } from '../../../../types/collection';
import { IProductCategory } from '../../../../types/productCategory';
import { removeTextBetweenParentheses } from '../../../../utils';
import styles from './__navigation.module.scss';

const cx = classNames.bind(styles);

const HeaderNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const { categoriesClient }: categoryState = useSelector(categorySelector);

  useEffect(() => {
    dispatch(categoryActions.getAllCategoryClient({ collections: true }));
  }, [dispatch]);

  return (
    <section className={cx('navigation')}>
      <div className={cx('menu')}>
        <ul className={cx('list-item')}>
          {categoriesClient &&
            [...categoriesClient.rows].reverse().map((category: ICategory) => {
              return (
                <li className={cx('item')} key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className={cx('group-category')}
                  >
                    {category.name}
                  </Link>
                  <Row
                    className={cx(
                      `${
                        category?.collections.length > 0 ? 'block-category' : ''
                      }`
                    )}
                  >
                    {[...category.collections]
                      .reverse()
                      .map((collection: ICollection) => {
                        return (
                          <Col
                            xl={6}
                            className={cx('wrap-children')}
                            key={collection.id}
                          >
                            <Link
                              to={`/collection/${collection.slug}`}
                              className={cx('category')}
                            >
                              {removeTextBetweenParentheses(collection.name)}
                            </Link>
                            <ul className={cx('child-category')}>
                              {[...collection.productCategories]
                                .reverse()
                                .map((item: IProductCategory) => {
                                  return (
                                    <li key={item.id}>
                                      <Link
                                        to={`/product-category/${item.slug}`}
                                      >
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
        </ul>
      </div>
    </section>
  );
};

export default HeaderNavigation;
