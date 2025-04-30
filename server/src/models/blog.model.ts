import mongoose, { Schema } from "mongoose";
import { IBlog } from "../types/model/i-blog-model";

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorAvatar: { type: String },
    createdAt: { type: String, required: true },
    readTime: { type: String, required: true },
    tags: { type: [String], required: true },
    featured: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
