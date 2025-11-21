import React from "react";
import Image from "next/image";
import { Eye, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRelativeTime } from "@/lib/utils";

export default function AdminTable({ items, onView, onClaim, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-sm text-slate-500">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium flex flex-row gap-4">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden bg-slate-100">
                    <Image
                      src={item.image || "https://placehold.co/300x200?text=No+Image"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-slate-400">{item.categories?.label || item.category}</span>
                  </div>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-900">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-slate-400">
                      {getRelativeTime(item.date)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-center'>
                  <Badge
                    variant={item.status === true ? "default" : "secondary"}
                    className={
                      item.status === true
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-slate-500 hover:bg-slate-600 text-white"
                    }
                  >
                    {item.status === true ? "Found" : "Returned"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(item)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4 text-slate-500" />
                    </Button>
                    {item.status === true && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onClaim(item)}
                        title="Mark as Returned"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
