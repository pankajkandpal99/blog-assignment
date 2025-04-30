import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/general/HeroSection";
import { AnimatedContainer } from "../components/blogs/AnimatedContainer";
import NewsLetterSection from "../components/blogs/NewsLetterSection";
import { useAppSelector } from "../hooks/redux";
import BlogCard from "../components/blogs/BlogCard";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { blogs, loading } = useAppSelector((state) => state.blog);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const featuredBlogs = useMemo(() => {
    const featured = blogs.filter((blog) => blog.featured).slice(0, 3);

    if (featured.length < 3) {
      const latestBlogs = [...blogs]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .filter((blog) => !featured.some((f) => f._id === blog._id))
        .slice(0, 3 - featured.length);

      return [...featured, ...latestBlogs];
    }

    return featured;
  }, [blogs]);

  const handleBookmark = (id: string) => {
    setBookmarkedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <HeroSection
            simplified={true}
            searchQuery=""
            setSearchQuery={() => {}}
            selectedCategory={null}
            setSelectedCategory={() => {}}
            clearFilters={() => {}}
            allCategories={[]}
          />

          <AnimatedContainer delay={0.4}>
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Featured Articles
                  </span>
                </h2>
                <Link to="/articles">
                  <Button variant="ghost" className="gap-2">
                    View all articles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <Card
                      key={item}
                      className="animate-pulse h-72 bg-muted/30"
                    ></Card>
                  ))}
                </div>
              ) : featuredBlogs.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredBlogs.map((blog) => (
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
                  className="text-center py-16 bg-muted/20 rounded-xl border border-border/50"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    No articles available yet
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We're working on creating amazing content for you. Check
                    back soon for new articles!
                  </p>
                </motion.div>
              )}

              {featuredBlogs.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Link to="/articles">
                    <Button size="lg" className="gap-2">
                      Browse all articles
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </AnimatedContainer>

          <NewsLetterSection />
        </div>
      </main>
    </div>
  );
}
