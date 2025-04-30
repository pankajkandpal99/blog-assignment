import { BlogCardProps } from "../../types";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Star,
  User,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const BlogCard = ({ blog, onBookmark, isBookmarked }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300">
        {blog.featured && (
          <div className="bg-primary/10 px-3 py-1 text-xs flex items-center justify-center">
            <Star className="h-3 w-3 mr-1 text-primary" />
            <span className="text-primary font-medium">Featured Article</span>
          </div>
        )}
        <CardHeader className="pb-2 space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="h-3 w-px bg-border"></div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{blog.readTime}</span>
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-2 leading-snug hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {blog.content}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {blog.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{blog.author}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-3 border-t border-border/30 mt-auto">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Heart className="h-3 w-3 mr-1 text-destructive" />
              <span>{blog.likes}</span>
            </div>
            <div className="flex items-center">
              <Bookmark className="h-3 w-3 mr-1" />
              <span>{blog.bookmarks}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              className={isBookmarked ? "text-primary-foreground" : ""}
              onClick={() => onBookmark(blog._id)}
            >
              <Bookmark
                className="h-4 w-4 mr-1"
                fill={isBookmarked ? "currentColor" : "none"}
              />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Read more</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
