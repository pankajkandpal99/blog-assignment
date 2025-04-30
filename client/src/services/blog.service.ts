/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../api/apiConfig";
import { BlogFormValues } from "../schema/blogSchema";
import axiosInstance from "../utils/axiosConfig";
import { apiClient } from "./auth.service";

export const BlogService = {
  async getAllBlogs() {
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.ADMIN.GET_ALL_BLOGS
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch blogs");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getBlogById(id: string) {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.ADMIN.GET_BLOG_BY_ID}/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch blog");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async createBlog(blogData: BlogFormValues) {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.ADMIN.CREATE_BLOG,
        blogData
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to create blog");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateBlog(id: string, blogData: BlogFormValues) {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.ADMIN.UPDATE_BLOG}/${id}`,
        blogData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to update blog");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteBlog(id: string) {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.ADMIN.DELETE_BLOG}/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to delete blog");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
