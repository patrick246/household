export interface PaginationResult<ResultType> {
  data: ResultType;
  page: number;
  size: number;
  total: number;
}
