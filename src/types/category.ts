import React from "react";

export interface typeCategory {
  id?: number,
  name: string,
  slug: string,
  parent_id: number | null,
  children: typeCategory[],
  key?: React.Key | string | number,
  createdAt?: string,
  updatedAt?: string,
}
