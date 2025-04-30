import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Blog } from "../../types";
import { BlogService } from "../../services/blog.service";
import { BlogFormValues } from "../../schema/blogSchema";

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  currentBlog: Blog | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  currentBlog: null,
};

export const fetchBlogs = createAsyncThunk<Blog[]>(
  "blog/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await BlogService.getAllBlogs();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch blogs");
    }
  }
);

export const fetchBlogById = createAsyncThunk<Blog, string>(
  "blog/fetchById",
  async (blogId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { blog: BlogState };
      const existingBlog = state.blog.blogs.find((blog) => blog._id === blogId);

      if (existingBlog) {
        return existingBlog;
      }

      // If not found in state, fetch from API
      const response = await BlogService.getBlogById(blogId);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch blog");
    }
  }
);

export const createBlog = createAsyncThunk<Blog, BlogFormValues>(
  "blog/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await BlogService.createBlog(blogData);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to create blog");
    }
  }
);

export const updateBlog = createAsyncThunk<Blog, Blog>(
  "blog/update",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await BlogService.updateBlog(blogData._id, blogData);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update blog");
    }
  }
);

export const deleteBlog = createAsyncThunk<string, string>(
  "blog/delete",
  async (blogId, { rejectWithValue }) => {
    try {
      await BlogService.deleteBlog(blogId);
      return blogId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to delete blog");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCurrentBlog: (state, action: { payload: Blog | null }) => {
      state.currentBlog = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addBlogOptimistic: (state, action: { payload: Blog }) => {
      state.blogs.push(action.payload);
    },
    updateBlogOptimistic: (state, action: { payload: Blog }) => {
      state.blogs = state.blogs.map((blog) =>
        blog._id === action.payload._id ? action.payload : blog
      );
    },
    removeBlogOptimistic: (state, action: { payload: string }) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;

        const blogIndex = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = action.payload;
        } else {
          state.blogs.push(action.payload);
        }
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentBlog = null;
      })

      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
        state.currentBlog = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
        state.currentBlog = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentBlog,
  clearError,
  addBlogOptimistic,
  updateBlogOptimistic,
  removeBlogOptimistic,
} = blogSlice.actions;

export default blogSlice.reducer;
