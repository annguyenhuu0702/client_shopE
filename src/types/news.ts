type News = {
  key: string | number | React.Key;
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type createNews = {
  userId: number;
  title: string;
  content: string;
};

export type { News, createNews };
