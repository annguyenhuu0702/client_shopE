import React from 'react';
import { useTitle } from '../../../hooks/useTitle';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../redux/slice/authSlice';

const AccumulatedPoint: React.FC = () => {
  const { user } = useSelector(authSelector);
  useTitle('Điểm tích lũy');
  return (
    <section className="pl-12 pb-36 max-sm:px-4 max-sm:pb-12 max-lg:px-8 max-lg:pb-12">
      <h3 className="mb-8 pt-8 text-4xl">Thông tin điểm tích lũy</h3>
      <div className="text-3xl">
        <span className="pr-2">
          Tổng điểm: <b>{user.user?.accumulatedPoints}</b>
        </span>
      </div>
    </section>
  );
};

export default AccumulatedPoint;
