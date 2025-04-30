/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FilePlus, Search } from "lucide-react";
import { Blog } from "../types";
import { BlogFormValues } from "../schema/blogSchema";
import { Button } from "../components/ui/button";
import { BlogForm } from "../components/forms/BlogForm";
import { BlogsTable } from "../components/blogs/BlogsTable";
// import { blogs } from "../constants/blogs";
import { Input } from "../components/ui/input";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  createBlog,
  deleteBlog,
  fetchBlogs,
  updateBlog,
} from "../features/blog/blog.slice";
import { Loader } from "../components/general/Loader";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  // const [blogsData, setBlogsData] = useState<Blog[]>(blogs);
  const { blogs, error, loading } = useAppSelector((state) => state.blog);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleCreate = () => {
    setEditingBlog(null);
    setIsCreating(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    // console.log("blog id for delete : ", id);
    dispatch(deleteBlog(id));
  };

  const handleSubmit = (values: BlogFormValues) => {
    if (editingBlog) {
      if (values._id) {
        dispatch(updateBlog(values as Blog));
      } else {
        console.error("Blog ID is missing for update.");
      }
    } else {
      dispatch(createBlog(values));
    }
    setIsCreating(false);
    setEditingBlog(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingBlog(null);
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading && blogs.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 max-w-7xl flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Blog Management
        </h1>
        {!isCreating && (
          <Button onClick={handleCreate} className="shrink-0 w-full sm:w-auto">
            <FilePlus className="h-4 w-4 mr-2" />
            Create New Blog
          </Button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-card rounded-lg border shadow-sm p-4 sm:p-6 mb-8 animate-in fade-in-50 duration-300">
          <h2 className="text-xl font-semibold mb-6 text-card-foreground">
            {editingBlog ? "Edit Blog" : "Create New Blog"}
          </h2>
          <BlogForm
            defaultValues={editingBlog || undefined}
            onSubmit={handleSubmit}
          />
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={handleCancel} className="ml-2">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
              All Blogs{" "}
              <span className="text-muted-foreground">
                ({filteredBlogs.length})
              </span>
            </h2>
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full md:w-64"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden shadow-sm">
            <BlogsTable
              blogs={filteredBlogs}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {filteredBlogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-muted rounded-lg">
              <FilePlus className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No blogs found</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm
                  ? "Try adjusting your search term"
                  : "Start by creating your first blog"}
              </p>
              {!searchTerm && (
                <Button onClick={handleCreate} className="mt-4">
                  Create Blog
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
