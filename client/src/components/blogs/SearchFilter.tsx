import { Search, X } from "lucide-react";
import { SearchFilterProps } from "../../types";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
  allCategories,
}: SearchFilterProps) => {
  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-10 pr-4 py-6 rounded-full shadow-sm border-2 border-border/50 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Active Filters */}
      {(searchQuery || selectedCategory) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge
              variant="outline"
              className="pl-2 pr-1 py-1 flex items-center gap-1 bg-secondary/10"
            >
              <span>"{searchQuery}"</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0 hover:bg-secondary/20"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge
              variant="outline"
              className="pl-2 pr-1 py-1 flex items-center gap-1 bg-primary/10"
            >
              <span>{selectedCategory}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0 hover:bg-primary/20"
                onClick={() => setSelectedCategory(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            className="text-xs text-primary hover:text-primary/80 hover:bg-primary/10"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </motion.div>
      )}

      {/* Categories */}
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max mx-auto justify-center flex-wrap">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            className="rounded-full px-4 py-1 text-sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Topics
          </Button>
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="rounded-full px-4 py-1 text-sm whitespace-nowrap transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
