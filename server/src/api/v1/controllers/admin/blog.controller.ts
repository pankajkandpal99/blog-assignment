import { ConflictError, NotFoundError } from "../../../../error-handler";
import { RequestContext } from "../../../../middleware/context";
import { Blog } from "../../../../models/blog.model";
import { logger } from "../../../../utils/logger";
import { HttpResponse } from "../../../../utils/service-response";

import { Response } from "express";

interface BlogSectionControllerType {
  createBlog: (context: RequestContext) => Promise<Response>;
  getAllBlogs: (context: RequestContext) => Promise<Response>;
  getBlogById: (context: RequestContext) => Promise<Response>;
  updateBlog: (context: RequestContext) => Promise<Response>;
  deleteBlog: (context: RequestContext) => Promise<Response>;
}

export const BlogSectionController: BlogSectionControllerType = {
  createBlog: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { body } = context;

        const existingBlog = await Blog.findOne({ title: body.title }).session(
          session
        );
        if (existingBlog) {
          throw new ConflictError("Blog with this title already exists", {
            field: "title",
            value: body.title,
          });
        }

        const blog = new Blog({
          ...body,
          createdBy: context.user?.id,
        });

        await blog.save({ session });

        return {
          _id: blog._id.toString(),
          title: blog.title,
          content: blog.content,
          author: blog.author,
          authorAvatar: blog.authorAvatar,
          createdAt: blog.createdAt,
          readTime: blog.readTime,
          tags: blog.tags,
          featured: blog.featured,
          likes: blog.likes,
          bookmarks: blog.bookmarks,
        };
      });

      return HttpResponse.send(context.res, result, 201);
    } catch (error) {
      logger.error("Error creating blog:", error);
      throw error;
    }
  },

  getAllBlogs: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const blogs = await Blog.find({})
          .session(session)
          .sort({ createdAt: -1 })
          .select("-__v")
          .lean();

        return blogs.map((blog) => ({
          ...blog,
          _id: blog._id,
        }));
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error fetching all blogs:", error);
      throw error;
    }
  },

  getBlogById: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;

        const blog = await Blog.findById(id).session(session).select("-__v");

        if (!blog) {
          throw new NotFoundError("Blog not found");
        }

        return {
          ...blog.toObject(),
          _id: blog._id.toString(),
        };
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error fetching blog by ID:", error);
      throw error;
    }
  },

  updateBlog: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;
        const updateData = context.body;

        const blog = await Blog.findById(id).session(session);
        if (!blog) {
          throw new NotFoundError("Blog not found");
        }

        // Check if another blog with the same title exists (excluding current blog)
        if (updateData.title && updateData.title !== blog.title) {
          const existingBlog = await Blog.findOne({
            title: updateData.title,
            _id: { $ne: id },
          }).session(session);

          if (existingBlog) {
            throw new ConflictError(
              "Another blog with this title already exists",
              {
                field: "title",
                value: updateData.title,
              }
            );
          }
        }

        updateData.updatedBy = context.user?.id;

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
          new: true,
          session,
        }).select("-__v");

        return {
          ...updatedBlog?.toObject(),
          _id: updatedBlog?._id.toString(),
        };
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error updating blog:", error);
      throw error;
    }
  },

  deleteBlog: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;

        const blog = await Blog.findByIdAndDelete(id).session(session);
        if (!blog) {
          throw new NotFoundError("Blog not found");
        }

        return {
          success: true,
          message: "Blog deleted successfully",
          deletedId: id,
        };
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error deleting blog:", error);
      throw error;
    }
  },
};
