export interface queryParams {
  p?: number;
  limit?: number;
  sortBy?: string;
  sortType?: string;
}

export interface tokenPayload<T> {
  token: string | null;
  dispatch: any;
  data: T;
  navigate?: any;
}

export interface tokenPayloadDelete {
  token: string | null;
  dispatch: any;
  id: number;
  params?: queryParams;
  p?: number;
  limit?: number;
}
