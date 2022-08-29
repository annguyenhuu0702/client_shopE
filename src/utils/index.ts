export const castToVND = (price: string | number) => {
  if (!price) return;
  price = price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  return price;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-');
};
