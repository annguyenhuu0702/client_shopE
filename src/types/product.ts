export interface product {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  newPrice: number;
  thumbnail?: string;
  slug: string;
  isDeleted: boolean;
  categoryId: number;
  productOptions: any;
  votes: any;
  productUsers: any;
  productCategories: any;
  key?: React.Key | string | number;
}
