import { ApiResponse } from "./ApiResponse";

export type ApiPaginatedPayload = {
  page: number;
  pageSize: number;
  orderBy?: string;
  sortOrder?: "ASC" | "DESC";
};

export type ApiPaginatedResponse<T> = ApiResponse<{
  items: T[];
  meta: {
    page: number;
    pageSize: number;
    totalItemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}>;
