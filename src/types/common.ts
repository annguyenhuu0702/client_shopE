export interface queryParams {
  p?: number;
  limit?: number;
  sortBy?: string;
  sortType?: string;
}

export interface tokenPayloadData<T> {
  token: string | null;
  dispatch: any;
  data: T;
  navigate?: any;
}

export interface tokenPayload {
  token: string | null;
  dispatch: any;
}
