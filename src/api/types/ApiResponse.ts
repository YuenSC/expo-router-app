export type ApiResponse<T> = {
  data: T;
  timestamp: string;
  path: string;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
};
