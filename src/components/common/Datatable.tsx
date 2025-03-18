"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  onDelete?: (id: number) => void;
  onView?: (item: T) => void;
  itemsPerPage?: number;
}

export default function DataTable<T extends { id: number }>({
  data,
  columns,
  onDelete,
  onView,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="mt-4">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.label}</TableHead>
              ))}
              {(onDelete || onView) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render
                      ? col.render(item)
                      : (item[col.key] as React.ReactNode)}
                  </TableCell>
                ))}
                {(onDelete || onView) && (
                  <TableCell>
                    {onView && (
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => onView(item)}
                      >
                        View
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDelete(item.id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
