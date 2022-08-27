import React from 'react';

export interface category {
  id?: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children: category[];
  key?: React.Key | string | number;
  createdAt?: string;
  updatedAt?: string;
}
