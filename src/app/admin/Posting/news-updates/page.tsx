"use client";

import { useEffect, useState } from "react";
import { fetchNews, createNews, updateNews, deleteNews } from "@/lib/api";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Upload, Star, Circle, StarOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
export default function AdminNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);

  // ✅ Form state (Ensure `is_featured` & `status` are set correctly)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    is_featured: false,
    status: "draft", // ✅ Default status to prevent validation errors
    image: null as File | null,
  });

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      is_featured: false,
      status: "draft",
      image: null,
    });
    setSelectedNews(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("category", formData.category);
      form.append("is_featured", formData.is_featured ? "1" : "0");
      form.append("status", formData.status);

      if (formData.image) {
        form.append("image", formData.image);
      }

      if (selectedNews) {
        await updateNews(selectedNews.id, form);
        toast.success("News Updated", {
          description: "The news post has been updated successfully.",
        });
      } else {
        await createNews(form);
        toast.success("News Created", {
          description: "A new news post has been added successfully.",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      const updatedNews = await fetchNews();
      setNews(updatedNews);
    } catch (error) {
      toast.error("Failed to save news", {
        description: "An error occurred while saving the news post.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedNewsId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedNewsId) return;

    try {
      await deleteNews(selectedNewsId);
      setNews((prev) => prev.filter((n) => n.id !== selectedNewsId));

      toast.success("News Deleted", {
        description: "The news post has been removed successfully.",
      });
    } catch {
      toast.error("Failed to delete news", {
        description: "There was an issue deleting the news post.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedNewsId(null);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, image: event.target.files[0] });
    }
  };

  const columns = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "is_featured",
      header: "Featured",
      cell: ({ row }: { row: any }) =>
        row.original.is_featured ? (
          <Star className="text-yellow-500 w-5 h-5" /> // ⭐ Star icon for featured
        ) : (
          <StarOff className="text-gray-400 w-5 h-5" /> // ❌ Faded star for not featured
        ),
    },
    
    { accessorKey: "status", header: "Status" },
    {
      header: "Actions",
      cell: ({ row }: { row: any }) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedNews(row.original);
              setFormData({
                title: row.original.title,
                content: row.original.content,
                category: row.original.category,
                is_featured: !!Number(row.original.is_featured), // ✅ Convert "1"/"0" or boolean properly
                status: row.original.status,
                image: null,
              });
              setIsDialogOpen(true);
            }}
          >
            <Edit className="w-4 h-4 text-blue-600" /> Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => confirmDelete(row.original.id)}
          >
            <Trash className="w-4 h-4" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-black p-6 w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage News Posts</h2>

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>
              Are you sure you want to delete this news post? This action cannot
              be undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        className="mb-4 bg-blue-600 text-white"
        onClick={() => {
          setSelectedNews(null);
          resetForm();
          setIsDialogOpen(true);
        }}
      >
        <Plus className="w-4 h-4 mr-2" /> Add News
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable columns={columns} data={news} />
      )}

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedNews ? "Edit News Post" : "Create News Post"}
              </DialogTitle>
            </DialogHeader>

            {/* Title */}
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {/* Category Dropdown */}
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Announcements">Announcements</SelectItem>
              </SelectContent>
            </Select>

            {/* Content */}
            <Textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />

            {/* Featured Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_featured}
                onCheckedChange={
                  (checked) =>
                    setFormData({ ...formData, is_featured: checked }) // ✅ Now properly updates state
                }
              />
              <label className="text-gray-700 dark:text-gray-300">
                Feature this post
              </label>
            </div>
            {/* Image Upload */}
            <div>
              <label className="text-gray-700 dark:text-gray-300 flex items-center">
                <Upload className="w-5 h-5 mr-2" /> Upload Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-green-600 text-white" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
