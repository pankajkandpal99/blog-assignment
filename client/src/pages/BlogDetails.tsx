import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Share2,
  Star,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";
import { fetchBlogById } from "../features/blog/blog.slice";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    currentBlog: blog,
    loading,
    error,
  } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog?.title,
          text: blog?.content.substring(0, 100) + "...",
          url: window.location.href,
        })
        .then(() => {
          toast.success("Article shared successfully");
        })
        .catch(() => {
          toast.error("Couldn't share the article");
        });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link has been copied to clipboard");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all blogs
        </Button>

        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all blogs
        </Button>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-destructive mb-4">
            Error loading blog
          </h2>
          <p className="text-muted-foreground">{error}</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-6"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all blogs
        </Button>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <p className="text-muted-foreground">
            The blog you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all blogs
      </Button>

      <article className="space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            {blog.featured && (
              <Badge variant="default" className="gap-1">
                <Star className="h-3 w-3" />
                Featured
              </Badge>
            )}
            <time className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(blog.createdAt), "MMMM d, yyyy")}
            </time>
            <span className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{blog.author}</p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>
          </div>
        </header>

        <Separator className="my-6" />

        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {blog.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        <Separator className="my-6" />

        <footer className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-1">
              <Heart className="h-4 w-4" />
              <span>{blog.likes} Likes</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Bookmark className="h-4 w-4" />
              <span>{blog.bookmarks} Bookmarks</span>
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share this article
          </Button>
        </footer>
      </article>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">More articles</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Here you can add related articles component */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <p className="text-muted-foreground">
              More articles coming soon...
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-muted/30">
            <p className="text-muted-foreground">
              More articles coming soon...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
