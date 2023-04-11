import { queryParams, tokenPayload } from './common';
type News = {
  key: string | number | React.Key;
  id: number;
  userId: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type createNews = {
  userId: number;
  title: string;
  content: string;
  thumbnail: string;
};

type updateNews = createNews & {
  id: number;
};

type getAllNewsParams = queryParams & {
  title?: string;
};

type getAllNews = tokenPayload & {
  params: getAllNewsParams;
};

export type { News, createNews, updateNews, getAllNews };
