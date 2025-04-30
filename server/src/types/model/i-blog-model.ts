import mongoose from "mongoose";

export interface IBlog extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  likes: number;
  bookmarks: number;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}
