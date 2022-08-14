export const castToVND = (price: string | number) => {
  if (!price) return;
  price = price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  return price;
};
