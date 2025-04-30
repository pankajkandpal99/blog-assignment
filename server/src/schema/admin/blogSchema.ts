import { z } from "zod";

export const blogFormSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  content: z.string().min(50, "Content must be at least 50 characters"),
  author: z.string().min(3, "Author name must be at least 3 characters"),
  authorAvatar: z.string().optional(),
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format"),
  readTime: z.string().min(3, "Read time must be at least 3 characters"),
  tags: z.array(z.string().min(2)).min(1, "At least one tag is required"),
  featured: z.boolean().default(false),
  likes: z.number().min(0).default(0),
  bookmarks: z.number().min(0).default(0),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
