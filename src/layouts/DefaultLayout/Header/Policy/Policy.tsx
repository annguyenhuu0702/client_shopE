import React from "react";
import styles from "./__policy.module.scss";
import globalStyles from "../../../styles/globalStyles.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const cxGlobal = classNames.bind(globalStyles);

const Policy: React.FC = () => {
  return (
    <section className={cx("policy")}>
      <div className={cxGlobal("w-1200")}>
        <div className={cx("list-policy")}>
          <div className={cx("policy-item")}>
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657261933/supersports/Freeship_eb016eee-c6f8-4f7c-bed1-2c85e1c2f9e1_medium_aw0kww.png"
              alt=""
              width={30}
              height={30}
            />
            <Link to="">Miễn phí giao hàng với đơn từ 699k</Link>
          </div>
          <div className={cx("policy-item")}>
            <img
              src="https://res.cloudinary.com/diot4imoq/img/upload/v1657261958/supersports/Doi-tra-15-ngay_c71ffaf2-0f42-4e6a-bc71-b3ddb3057448_medium_iughqd.png"
              alt=""
              width={30}
              height={30}
            />
            <Link to="">15 ngày đổi trả</Link>
          </div>
          <div className={cx("policy-item")}>
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657261967/supersports/Tra-gop_850ce166-ee2b-4dd0-8925-acfddc7e0765_medium_hnerkr.png"
              alt=""
              width={30}
              height={30}
            />
            <Link to="">Trả góp 0%</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;
