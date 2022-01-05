export enum PaginationOrderEnum {
  ASC = "ASC",
  DESC = 'DESC'
}

export interface PaginationOptions {
  page?: number;
  perPage?: number;
  sortBy?: string[];
  order?: PaginationOrderEnum;
}

export interface PaginatedResult<T = any> extends PaginationOptions {
  data: T;
  totalPages: number;
  totalItems: number;
  filter?: any;
}
