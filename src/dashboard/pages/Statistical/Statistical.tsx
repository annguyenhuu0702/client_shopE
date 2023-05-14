import { Button, DatePicker, DatePickerProps, Select } from 'antd';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { paymentApi } from '../../../apis/paymentApi';
import { authSelector } from '../../../redux/slice/authSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistical: React.FC = () => {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  // xem chọn tháng hay năm
  const [action, setAction] = useState<string>('');

  // Lấy tháng năm
  const [dateString, setDateString] = useState<string>('');

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDateString(dateString);
  };

  const handleChange = (value: string) => {
    setAction(value);
  };

  const splitDateString = dateString.split('-');

  const handleGetrevenue = () => {
    try {
      if (dateString !== '') {
        if (action === 'month') {
          (async () => {
            const splitDateString = dateString.split('-');
            const res = await paymentApi.getRevenueMonth(
              user.accessToken,
              dispatch,
              {
                month: splitDateString[1] || new Date().getMonth() + 1,
                year: splitDateString[0],
              }
            );
            const { data } = res.data;
            setData(data);
          })();
        } else {
          (async () => {
            const splitDateString = dateString.split('-');
            const res = await paymentApi.getRevenueYear(
              user.accessToken,
              dispatch,
              {
                year: splitDateString[0],
              }
            );
            const { data } = res.data;
            setData(data);
          })();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 w-full">
      <div className="w-[400px] flex gap-4">
        <Select
          placeholder="Chọn kiểu thống kê"
          style={{ width: 300 }}
          onChange={handleChange}
          options={[
            { value: 'month', label: 'Chọn tháng' },
            { value: 'year', label: 'Chọn năm' },
          ]}
        />
        <Button
          className="px-10"
          onClick={() => {
            handleGetrevenue();
          }}
        >
          Xem
        </Button>
      </div>
      {action !== '' && (
        <div className="w-[400px]  mt-4">
          <DatePicker
            onChange={onChange}
            picker={action as any}
            placeholder={`Chọn ${action}`}
          />
        </div>
      )}
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            // title: {
            //   display: true,
            //   text:
            //     action === 'month'
            //       ? `Doanh thu theo tháng ${
            //           splitDateString[1] || new Date().getMonth() + 1
            //         }`
            //       : `Doanh thu theo năm ${splitDateString[0]}`,
            // },
          },
        }}
        data={{
          labels: data.map((item: any) =>
            action === 'month' ? item.day : item.month
          ),
          datasets: [
            {
              label: 'Doanh thu',
              data: data.map((item: any) => item.total),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
            },
          ],
        }}
        datasetIdKey="total"
      />
    </div>
  );
};

export default Statistical;
