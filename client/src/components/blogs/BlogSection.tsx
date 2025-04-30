import { Blog } from "../../types/index";
import { AnimatedContainer } from "./AnimatedContainer";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";
import BlogCard from "./BlogCard";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { blogs } from "../../constants/blogs";

type BlogSectionProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredBlogs: Blog[];
  bookmarkedPosts: number[];
  handleBookmark: (id: number) => void;
  clearFilters: () => void;
  loading: boolean;
};

export const BlogSection = ({
  activeTab,
  setActiveTab,
  filteredBlogs,
  bookmarkedPosts,
  handleBookmark,
  clearFilters,
  loading,
}: BlogSectionProps) => {
  return (
    <div className="space-y-8">
      <AnimatedContainer delay={0.4}>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full sm:w-auto bg-muted/40 p-1">
                <TabsTrigger
                  value="all"
                  className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  All Articles
                </TabsTrigger>
                <TabsTrigger
                  value="featured"
                  className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Featured
                </TabsTrigger>
                <TabsTrigger
                  value="bookmarked"
                  className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Saved ({bookmarkedPosts.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredBlogs.length} of {blogs.length} articles
              </span>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card
                  key={item}
                  className="animate-pulse h-72 bg-muted/30"
                ></Card>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onBookmark={handleBookmark}
                  isBookmarked={bookmarkedPosts.includes(blog._id)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-muted/20 rounded-xl border border-border/50"
            >
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-6 opacity-70" />
              <h3 className="text-2xl font-semibold mb-3">No articles found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try
                adjusting your filters or browse all articles.
              </p>
              <Button
                variant="default"
                size="lg"
                className="mt-2"
                onClick={clearFilters}
              >
                Reset filters
              </Button>
            </motion.div>
          )}
        </div>
      </AnimatedContainer>
    </div>
  );
};
