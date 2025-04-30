import { useState } from "react";
import {
  Star,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import { Blog } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface BlogsTableProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

const MAX_TITLE_LENGTH = 30;

export const BlogsTable = ({ blogs, onEdit, onDelete }: BlogsTableProps) => {
  const [sortField, setSortField] = useState<keyof Blog>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleSort = (field: keyof Blog) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortField === "title" || sortField === "author") {
      return sortDirection === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    } else if (sortField === "createdAt") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortField === "featured") {
      return sortDirection === "asc"
        ? Number(a.featured) - Number(b.featured)
        : Number(b.featured) - Number(a.featured);
    }
    return 0;
  });

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const SortIndicator = ({ field }: { field: keyof Blog }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1 inline" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1 inline" />
    );
  };

  const truncateTitle = (title: string) => {
    return title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-1/4 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center">
                  Title
                  <SortIndicator field="title" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("author")}
              >
                <div className="flex items-center">
                  Author
                  <SortIndicator field="author" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center">
                  Date
                  <SortIndicator field="createdAt" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Tags</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("featured")}
              >
                <div className="flex items-center">
                  Status
                  <SortIndicator field="featured" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog._id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{truncateTitle(blog.title)}</span>
                    </TooltipTrigger>
                    {blog.title.length > MAX_TITLE_LENGTH && (
                      <TooltipContent
                        side="top"
                        align="start"
                        className="max-w-[300px]"
                      >
                        <p>{blog.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {blog.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{blog.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {blog.featured ? (
                    <Badge variant="default" className="gap-1">
                      <Star className="h-3 w-3" />
                      Featured
                    </Badge>
                  ) : (
                    <Badge variant="outline">Regular</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <div className="hidden sm:flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(blog)}
                        className="h-8"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(blog._id)}
                        className="h-8"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                    </div>
                    <div className="sm:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(blog)}>
                            <Edit className="h-3.5 w-3.5 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteClick(blog._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteConfirmId !== null} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
