import React, { useEffect, useState } from 'react';
import styles from './__footer.module.scss';

import {
  faCcAmex,
  faCcJcb,
  faCcMastercard,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Footer: React.FC = () => {
  // button back to top
  const [showButton, setShowButton] = useState<boolean>(false);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // lấy kích thước height để hiển thị button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={cx('footer')}>
      <>
        {showButton && (
          <div className="z-10 fixed bottom-16 right-16">
            <button
              className="border-0 w-20 h-20 rounded-full drop-shadow-md bg-indigo-500 text-white text-4xl font-bold  cursor-pointer "
              onClick={scrollUp}
            >
              <AiOutlineArrowUp />
            </button>
          </div>
        )}
      </>
      <section className={cx('footer-center')}>
        <div className={cx('content')}>
          <Row gutter={[12, 12]}>
            <Col xl={6} md={6} xs={24}>
              <div className={cx('item')}>
                <h4>CÔNG TY CỔ PHẦN CANIFA</h4>
                <ul>
                  <li>
                    <span>
                      Số ĐKKD: 0107574310, ngày cấp: 23/09/2016, nơi cấp: Sở Kế
                      hoạch và đầu tư Hà Nội
                    </span>
                  </li>
                  <li>
                    <span>
                      Trụ sở chính: Số 688, Đường Quang Trung, Phường La Khê,
                      Quận Hà Đông, Hà Nội, Việt Nam
                    </span>
                  </li>
                  <li>
                    <span>
                      Địa chỉ liên hệ: Phòng 301 Tòa nhà GP Invest, 170 La
                      Thành, P. Ô Chợ Dừa, Q. Đống Đa, Hà Nội
                    </span>
                  </li>
                  <li>
                    <span>Số điện thoại: +8424 - 7303.0222</span>
                  </li>
                  <li>
                    <span>Fax: +8424 - 6277.6419</span>
                  </li>
                  <li>
                    <span>Địa chỉ email: hello@canifa.com</span>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={6} md={6} xs={24}>
              <div className={cx('item')}>
                <h4>THƯƠNG HIỆU</h4>
                <ul>
                  <li>
                    <Link to="">Giới thiệu</Link>
                  </li>
                  <li>
                    <Link to="">Tin tức</Link>
                  </li>
                  <li>
                    <Link to="">Tuyển dụng</Link>
                  </li>
                  <li>
                    <Link to="">Với cộng đồng</Link>
                  </li>
                  <li>
                    <Link to="">Hệ thống cửa hàng</Link>
                  </li>
                  <li>
                    <Link to="">Liên hệ</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={6} md={6} xs={24}>
              <div className={cx('item')}>
                <h4>HỖ TRỢ</h4>
                <ul>
                  <li>
                    <Link to="">Hỏi đáp</Link>
                  </li>
                  <li>
                    <Link to="">Chính sách KHTT</Link>
                  </li>
                  <li>
                    <Link to="">Chính sách vận chuyển</Link>
                  </li>
                  <li>
                    <Link to="">Hướng dẫn chọn size</Link>
                  </li>
                  <li>
                    <Link to="">Kiểm tra đơn hàng</Link>
                  </li>
                  <li>
                    <Link to="">Quy định đổi hàng</Link>
                  </li>
                  <li>
                    <Link to="">Tra cứu điểm thẻ</Link>
                  </li>
                  <li>
                    <Link to="">Chính sách bảo mật</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={6} md={6} xs={24}>
              <div className={cx('item')}>
                <h4>PHƯƠNG THỨC THANH TOÁN</h4>
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
            <span>© 2022 CANIFA</span>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
