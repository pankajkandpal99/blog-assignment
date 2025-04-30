import { useState, useMemo, useEffect } from "react";
import { blogs } from "../constants/blogs";
import { Blog } from "../types";
import { HeroSection } from "../components/general/HeroSection";
import { BlogSection } from "../components/blogs/BlogSection";
import NewsLetterSection from "../components/blogs/NewsLetterSection";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const allCategories = useMemo<string[]>(() => {
    const tags = blogs.flatMap((blog) => blog.tags);
    return Array.from(new Set(tags)).sort();
  }, []);

  const filteredBlogs = useMemo<Blog[]>(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || blog.tags.includes(selectedCategory);

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "featured" && blog.featured) ||
        (activeTab === "bookmarked" && bookmarkedPosts.includes(blog._id));

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchQuery, selectedCategory, activeTab, bookmarkedPosts]);

  const handleBookmark = (id: number) => {
    setBookmarkedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <HeroSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            clearFilters={clearFilters}
            allCategories={allCategories}
          />

          <BlogSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredBlogs={filteredBlogs}
            bookmarkedPosts={bookmarkedPosts}
            handleBookmark={handleBookmark}
            clearFilters={clearFilters}
            loading={loading}
          />

          <NewsLetterSection />
        </div>
      </main>
    </div>
  );
}
