"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const initialData = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@gmail.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@gmail.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@gmail.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@hotmail.com" },
];

export default function DataTable() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  
  const filteredData = data.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    return sortOrder === "asc"
      ? a[sortField] > b[sortField]
        ? 1
        : -1
      : a[sortField] < b[sortField]
      ? 1
      : -1;
  });

  const toggleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <table className="min-w-full border rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th>
              <Checkbox
                checked={selectedRows.length === data.length}
                onCheckedChange={() => {
                  setSelectedRows(
                    selectedRows.length === data.length ? [] : data.map((d) => d.id)
                  );
                }}
              />
            </th>
            <th onClick={() => toggleSort("status")} className="cursor-pointer">Status</th>
            <th onClick={() => toggleSort("email")} className="cursor-pointer">Email</th>
            <th onClick={() => toggleSort("amount")} className="cursor-pointer text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id} className="border-t">
              <td>
                <Checkbox
                  checked={selectedRows.includes(item.id)}
                  onCheckedChange={() => {
                    setSelectedRows((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id]
                    );
                  }}
                />
              </td>
              <td>{item.status}</td>
              <td>{item.email.toLowerCase()}</td>
              <td className="text-right">${item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <span>{selectedRows.length} selected.</span>
      </div>
    </div>
  );
}
