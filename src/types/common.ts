export interface QueryParams {
  p?: number;
  limit?: number;
  sortBy?: string;
  sortType?: string;
}

export interface tokenPayload<T> {
  token: string;
  dispatch: any;
  data: T;
}
