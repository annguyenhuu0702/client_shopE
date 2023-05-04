import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex justify-center px-20 py-10 max-sm:px-4 max-sm:mt-24">
      <div className="sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] flex flex-col items-center justify-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFEB] rounded-lg top-1/2 left-1/2 -translate-x-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-4xl font-semibold">Thanh toán thành công</span>
        <p className="text-center">
          Cảm ơn bạn đã mua sản phẩm ở cửa hàng chúng tôi. Chúng tôi sẽ cố gắng
          ngày càng hoàn thiện để mang lại những sản phẩm tuyệt vời nhất.
        </p>
        <button
          className="p-3 bg-[#4F46E5] rounded-lg w-full text-white border-none outline-none cursor-pointer"
          onClick={() => {
            navigate(routes.home);
          }}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
