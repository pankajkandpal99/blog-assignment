import { Router } from "express";
import { createApiHandler } from "../../../../utils/api-factory";
import { blogFormSchema } from "../../../../schema/admin/blogSchema";
import { BlogSectionController } from "../../controllers/admin/blog.controller";

export default (router: Router) => {
  router.post(
    "/admin/blogs/create",
    createApiHandler(BlogSectionController.createBlog, {
      requireAuth: true,
      requireAdmin: true,
      useTransaction: true,
      bodySchema: blogFormSchema,
    })
  );

  router.get(
    "/admin/blogs/get-all",
    createApiHandler(BlogSectionController.getAllBlogs, {
      useTransaction: true,
      requireAuth: false,
    })
  );

  router.get(
    "/admin/blogs/get-one/:id",
    createApiHandler(BlogSectionController.getBlogById, {
      useTransaction: true,
      requireAuth: false,
    })
  );

  router.put(
    "/admin/blogs/update/:id",
    createApiHandler(BlogSectionController.updateBlog, {
      requireAuth: true,
      requireAdmin: true,
      useTransaction: true,
      bodySchema: blogFormSchema,
    })
  );

  router.delete(
    "/admin/blogs/delete/:id",
    createApiHandler(BlogSectionController.deleteBlog, {
      useTransaction: true,
      requireAuth: true,
      requireAdmin: true,
    })
  );
};
