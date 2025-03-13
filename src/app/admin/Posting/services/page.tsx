"use client";

import { useEffect, useState } from "react";
import { fetchServices, createService, updateService, deleteService } from "@/lib/api";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  // ✅ Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    image: null as File | null,
  });

  // ✅ Fetch Services
  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
  
    getServices(); // Initial fetch
    const interval = setInterval(getServices, 5000); // ✅ Auto-refresh every 5 seconds
  
    return () => clearInterval(interval); // ✅ Cleanup on unmount
  }, []);
  

  // ✅ Reset Form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "active",
      image: null,
    });
    setSelectedService(null);
  };

  // ✅ Handle Save
  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("status", formData.status);
  
      if (formData.image) {
        form.append("image", formData.image);
      }
  
      if (selectedService) {
        await updateService(selectedService.id, form);
        toast.success("Service Updated", { description: "The service has been updated successfully." });
      } else {
        await createService(form);
        toast.success("Service Created", { description: "A new service has been added successfully." });
      }
  
      setIsDialogOpen(false);
      resetForm();
      const updatedServices = await fetchServices();
      setServices(updatedServices);
    } catch (error) {
      toast.error("Failed to save service", { description: "An error occurred while saving the service." });
    }
  };
  
  const confirmDelete = (id: number) => {
    setSelectedServiceId(id);
    setIsDeleteDialogOpen(true);
  };
  
  // ✅ Handle Delete
  const handleDelete = async () => {
    if (!selectedServiceId) return;
  
    try {
      await deleteService(selectedServiceId);
      setServices((prev) => prev.filter((s) => s.id !== selectedServiceId));
  
      toast.success("Service Deleted", { description: "The service has been removed successfully." });
    } catch {
      toast.error("Failed to delete service", { description: "There was an issue deleting the service." });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedServiceId(null);
    }
  };
  

  // ✅ Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, image: event.target.files[0] });
    }
  };

  // ✅ Define Datatable Columns
  const columns = [
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: any }) => (
        <span className={`px-2 py-1 rounded-md text-sm font-medium ${row.original.status === "active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: { row: any }) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => { 
            setSelectedService(row.original);
            setFormData({
              title: row.original.title,
              description: row.original.description,
              status: row.original.status,
              image: null,
            });
            setIsDialogOpen(true);
          }}>
            <Edit className="w-4 h-4 text-blue-600" /> Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => confirmDelete(row.original.id)}>
            <Trash className="w-4 h-4" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-black p-6 w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>

      <Dialog open={isDeleteDialogOpen} onOpenChange={() => setIsDeleteDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>Are you sure you want to delete this service? This action cannot be undone.</p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      {/* ✅ Add Service Button */}
      <Button className="mb-4 bg-blue-600 text-white" onClick={() => { 
        setSelectedService(null); 
        resetForm();
        setIsDialogOpen(true); 
      }}>
        <Plus className="w-4 h-4 mr-2" /> Add Service
      </Button>

      {/* ✅ Datatable */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable columns={columns} data={services} />
      )}

      {/* ✅ Service Dialog */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedService ? "Edit Service" : "Create Service"}</DialogTitle>
            </DialogHeader>

            {/* Service Title */}
            <Input
              placeholder="Service Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            {/* Service Description */}
            <Textarea
              placeholder="Service Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-20"
            />

            {/* Status Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.status === "active"}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "active" : "inactive" })}
              />
              <label className="text-gray-700 dark:text-gray-300">Active</label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-gray-700 dark:text-gray-300 flex items-center">
                <Upload className="w-5 h-5 mr-2" /> Upload Image
              </label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-green-600 text-white">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
