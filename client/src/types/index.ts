export type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  likes: number;
  bookmarks: number;
};

export type BlogCardProps = {
  blog: Blog;
  onBookmark: (id: string) => void;
  isBookmarked: boolean;
};

export type SearchFilterProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  clearFilters: () => void;
  allCategories: string[];
};
