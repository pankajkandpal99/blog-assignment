import { Blog } from ".";

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type BlogResponse = ApiResponse<Blog>;
export type BlogsResponse = ApiResponse<Blog[]>;
