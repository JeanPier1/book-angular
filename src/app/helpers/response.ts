export interface Response<T> {
  status: string;
  message: string;
  data: T;
}
export interface Paginable<T> {
  content: T;
  totalItems: number;
  page: number;
  pageSize: number;
}
