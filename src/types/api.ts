export interface IPaginatedData<T> {
  data: T;
  page: number;
  pageCount: number;
  total: number;
}
