export const castToVND = (price: any) => {
  if(!price) return;
  price = price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
  return price;
}