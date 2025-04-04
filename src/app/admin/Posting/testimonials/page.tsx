"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getTestimonials, updateTestimonialStatus, deleteTestimonial } from "@/lib/api";
import TestimonialDetailsModal from "@/components/common/TestimonialDetailsModal";

// Defining the Testimonial type inline
type Testimonial = {
  id: number;
  name: string;
  rating: number;
  experience: string;
  photo: string | null;
  media: string[]; // Assuming URLs are returned
  status: number; // 0 = unpublished, 1 = published
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const fetchData = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to load testimonials");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePublishToggle = async (id: number, newStatus: number) => {
    try {
      await updateTestimonialStatus(id, newStatus);
      toast.success(`Testimonial ${newStatus ? "published" : "unpublished"} successfully`);
      fetchData();
    } catch (err) {
      toast.error("Failed to update testimonial status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Client Testimonials</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.rating} ★</td>
                <td className="p-2 text-center">
                  {item.status === 1 ? "Published" : "Unpublished"}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelected(item)} // Set selected testimonial for modal
                  >
                    View
                  </Button>
                  <Button
                    variant={item.status === 1 ? "secondary" : "default"}
                    onClick={() => handlePublishToggle(item.id, item.status === 1 ? 0 : 1)}
                  >
                    {item.status === 1 ? "Unpublish" : "Publish"}
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pass selected testimonial data to the modal component */}
      {selected && (
        <TestimonialDetailsModal
          open={!!selected}
          onClose={() => setSelected(null)} // Close modal on close button
          testimonial={selected}
        />
      )}
    </div>
  );
}
