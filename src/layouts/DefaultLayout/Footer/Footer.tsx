import React from 'react';
import 'antd/dist/antd.css';
import styles from './__footer.module.scss';

import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCcAmex,
  faCcJcb,
  faCcMastercard,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

const Footer: React.FC = () => {
  return (
    <section className={cx('footer')}>
      <section className={cx('footer-top')}>
        <div className={cx('wrap')}>
          <div className={cx('left')}>
            <div className={cx('text')}>
              <span>JOIN THE CONVERSATION</span>
            </div>
            <div className={cx('icons')}>
              <a href="https://www.facebook.com/Topxoan070227091603/">
                <img
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1657683338/supersports/Facebook_sila2r.png"
                  alt=""
                />
              </a>
              <a href="https://www.youtube.com/channel/UCMzFx3TxZQwJKC5Ps0s4Shw">
                <img
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1657683346/supersports/Youtube_xlh1rz.png"
                  alt=""
                />
              </a>
              <a href="https://www.instagram.com/topxoan.2804/">
                <img
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1657683349/supersports/Instagram_sqjzao.png"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className={cx('right')}>
            <div className={cx('register')}>
              <input
                type="text"
                placeholder="Nhập email của bạn để nhận khuyến mãi mới nhất"
              />
              <button>Đăng ký</button>
            </div>
          </div>
        </div>
      </section>
      <section className={cx('footer-center')}>
        <div className={cx('content')}>
          <Row>
            <Col xl={6} md={6} xs={12}>
              <div className={cx('item')}>
                <h4>VỀ SUPERSPORTS</h4>
                <ul>
                  <li>
                    <Link to="">Giới thiệu</Link>
                  </li>
                  <li>
                    <Link to="">Hệ thống cửa hàng</Link>
                  </li>
                  <li>
                    <Link to="">Sơ đồ Web</Link>
                  </li>
                  <li>
                    <Link to="">Thông tin liên hệ</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={6} md={6} xs={12}>
              <div className={cx('item')}>
                <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                <ul>
                  <li>
                    <Link to="">Chính sách giao hàng</Link>
                  </li>
                  <li>
                    <Link to="">Hướng dẫn chọn Size</Link>
                  </li>
                  <li>
                    <Link to="">Chính sách đổi trả hàng</Link>
                  </li>
                  <li>
                    <Link to="">Hỗ trợ và Giải đáp thắc mắc</Link>
                  </li>
                  <li>
                    <Link to="">Chính sách trả góp</Link>
                  </li>
                  <li>
                    <Link to="">Các điều khoản và điều kiện</Link>
                  </li>
                  <li>
                    <Link to="">Chính sách bảo mật</Link>
                  </li>
                  <li>
                    <Link to="">Hướng dẫn mua hàng</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={6} md={6} xs={12}>
              <div className={cx('item')}>
                <h4>GROUP BUSINESS</h4>
                <ul>
                  <li>
                    <Link to="">Nguyễn Kim</Link>
                  </li>
                  <li>
                    <Link to="">Big C</Link>
                  </li>
                  <li>
                    <Link to="">Crocs Vietnam</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={6} md={6} xs={12}>
              <div className={cx('item')}>
                <h4>PHƯƠNG THỨC THANH TOÁN</h4>
                <p>CASH ON DELIVERY</p>
                <ul className={cx('deliveries')}>
                  <li>
                    <FontAwesomeIcon icon={faCcVisa} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCcMastercard} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCcAmex} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCcJcb} />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className={cx('footer-bottom')}>
        <div className={cx('wrap')}>
          <div className={cx('left')}>
            <p>
              <strong>
                CÔNG TY TNHH MTV THƯƠNG MẠI THỜI TRANG TỔNG HỢP (GTF)
              </strong>
              <br />
              Văn phòng: Số 163, Phan Đăng Lưu, Phường 01, Phú Nhuận, Hồ Chí
              Minh, Việt Nam
              <br />
              Kho Thương mại Điện Tử: TBS Logistics Tân Vạn, Bình Dương, Việt
              Nam <br />
              Tổng đài: 1900 63 64 01 <br />
              Mã số Doanh Nghiệp: 0314635071, đăng ký thay đổi ngày 20 tháng 04
              năm 2020
              <br />
            </p>
          </div>
          <div className={cx('right')}>
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657698613/supersports/logoSaleNoti-220x80_msxaqc.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Footer;
