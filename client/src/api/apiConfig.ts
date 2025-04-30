import { API_BASE_URL } from "../config/config";

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  USER: {
    CURRENT_USER: `${API_BASE_URL}/api/v1/users/me`,
    PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/v1/users/update`,
  },
  ADMIN: {
    CREATE_BLOG: `${API_BASE_URL}/api/v1/admin/blogs/create`,
    GET_ALL_BLOGS: `${API_BASE_URL}/api/v1/admin/blogs/get-all`,
    GET_BLOG_BY_ID: `${API_BASE_URL}/api/v1/admin/blogs/get-one`,
    UPDATE_BLOG: `${API_BASE_URL}/api/v1/admin/blogs/update`,
    DELETE_BLOG: `${API_BASE_URL}/api/v1/admin/blogs/delete`,
  },
};

export { API_ENDPOINTS };
