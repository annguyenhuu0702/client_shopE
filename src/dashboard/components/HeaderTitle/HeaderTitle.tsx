import React from 'react';
import styles from './__headerTitle.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className={cx('header')}>
      <span>{title}</span>
    </div>
  );
};

export default HeaderTitle;
