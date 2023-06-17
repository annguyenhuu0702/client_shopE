import slugify from 'slugify';

export const castToVND = (price?: string | number) => {
  price = price?.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  return price;
};

export const configSlugify = (text: string) => {
  return slugify(text, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[{()}]/g, // remove characters that match regex, defaults to `undefined`
    // remove: undefined,
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'vi', // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};

export const removeTextBetweenParentheses = (text?: string) => {
  return text?.replace(/ *\([^)]*\) */g, '');
};

export const removeParenthesis = (text: string) => {
  return text.replace(/[{()}]/g, '');
};

export const makeid = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
