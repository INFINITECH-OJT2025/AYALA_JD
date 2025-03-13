'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

const dummyProperties: Property[] = [
  { id: 1, title: 'Luxury Condo', location: 'Makati', price: 5000000, status: 'pending' },
  { id: 2, title: 'Beach House', location: 'Batangas', price: 8000000, status: 'approved' },
  { id: 3, title: 'City Apartment', location: 'Manila', price: 3000000, status: 'rejected', rejectionReason: 'Incomplete documents' },
];

const SellerListingsTable = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({ title: '', location: '', price: '', status: 'pending' });

  const filteredProperties = dummyProperties.filter((property) => {
    if (filter !== 'all' && property.status !== filter) return false;
    return property.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-x-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'}  onClick={() => setFilter('all')}>
              🟡 All Listings
            </Button>
            <Button variant={filter === 'pending' ? 'default' : 'outline'} onClick={() => setFilter('pending')}>
              ⏳ Pending
            </Button>
            <Button variant={filter === 'approved' ? 'default' : 'outline'} onClick={() => setFilter('approved')}>
              ✅ Approved
            </Button>
            <Button variant={filter === 'rejected' ? 'default' : 'outline'} onClick={() => setFilter('rejected')}>
              🚫 Rejected
            </Button>
            <Dialog>
      <DialogTrigger asChild>
      </DialogTrigger>
      {isDialogOpen && (
        <DialogContent className="max-w-5xl h-[90vh] overflow-hidden p-4 m-4">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[75vh] pr-4">
            <div className="space-y-6">

              {/* Type of Listing */}
              <div>
                <h3 className="text-lg font-semibold">Type of Listing</h3>
                <div className="flex gap-4 mt-2">
                  <Label className="flex items-center gap-2">
                    <Checkbox /> For Rent
                  </Label>
                  <Label className="flex items-center gap-2">
                    <Checkbox /> For Sale
                  </Label>
                </div>
              </div>

              {/* Property Info */}
              <div>
                <h3 className="text-lg font-semibold">Property Info</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Input name="property_name" placeholder="Property Name" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1br">1BR</SelectItem>
                      <SelectItem value="2br">2BR</SelectItem>
                      <SelectItem value="loft">Loft</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bare">Bare</SelectItem>
                      <SelectItem value="semi">Semi-Furnished</SelectItem>
                      <SelectItem value="fully">Fully Furnished</SelectItem>
                      <SelectItem value="interiored">Interiored</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input name="location" placeholder="Location" />
                  <Input name="price" placeholder="Price" type="number" />
                  <Input name="square_meter" placeholder="Square Meter" type="number" />
                  <Input name="floor_number" placeholder="Floor Number" type="number" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Parking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="with">With Parking</SelectItem>
                      <SelectItem value="without">Without Parking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Features and Amenities */}
              <div>
                <h3 className="text-lg font-semibold">Features and Amenities</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Pool Area",
                    "Guest Suite",
                    "Underground Parking",
                    "Pet-Friendly Facilities",
                    "Balcony/Terrace",
                    "Club House",
                    "Gym/Fitness Center",
                    "Elevator",
                    "Concierge Services",
                    "Security",
                  ].map((feature) => (
                    <Label key={feature} className="flex items-center gap-2">
                      <Checkbox /> {feature}
                    </Label>
                  ))}
                </div>
              </div>

              {/* Property Image */}
              <div>
                <h3 className="text-lg font-semibold">Property Image</h3>
                <Input type="file" accept="image/*" className="mt-2" />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={() => setIsDialogOpen(false)}>
              Submit Property
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
          </div>
          <Input
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              {filter === 'rejected' && <TableHead>Rejection Reason</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price.toLocaleString()} PHP</TableCell>
                  <TableCell>
                    {property.status === 'pending' ? '⏳ Pending' : property.status === 'approved' ? '✅ Approved' : '🚫 Rejected'}
                  </TableCell>
                  {filter === 'rejected' && <TableCell>{property.rejectionReason}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SellerListingsTable;
