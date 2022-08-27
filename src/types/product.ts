import { category } from './category';

export interface Product {
  id?: number;
  name: string;
  slug: string;
  price: number;
  thumbnail?: string;
  description: string;
  new_price?: number;
  createdAt?: string;
  updatedAt?: string;
  key?: React.Key | string | number;
  category_id: number;
  category?: category;
}
