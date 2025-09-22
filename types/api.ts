export interface ApiResponse<T = unknown> {
  headers: Record<string, string>;
  status: number;
  data: T;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  data?: unknown;
}

export interface ApiError {
  message: string;
}
