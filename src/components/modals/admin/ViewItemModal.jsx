import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ViewItemModal({ isOpen, onOpenChange, selectedItem }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
        </DialogHeader>
        {selectedItem && (
          <div className="space-y-4">
            <div className="relative h-48 w-full bg-slate-100 rounded-lg overflow-hidden">
              <Image
                src={
                  selectedItem.image ||
                  "https://placehold.co/300x200?text=No+Image"
                }
                alt={selectedItem.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-500">Name</Label>
                <p className="font-medium">{selectedItem.name}</p>
              </div>
              <div>
                <Label className="text-slate-500">Category</Label>
                <p className="font-medium">
                  {selectedItem.categories?.label || selectedItem.category}
                </p>
              </div>
              <div>
                <Label className="text-slate-500">Date Found</Label>
                <p className="font-medium">
                  {new Date(selectedItem.date).toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-slate-500">Location</Label>
                <p className="font-medium">{selectedItem.location}</p>
              </div>
              <div>
                <Label className="text-slate-500">Status</Label>
               <Badge
                  variant={selectedItem.status === true ? "default" : "secondary"}
                  className={
                    selectedItem.status === true
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-slate-500 hover:bg-slate-600 text-white"
                  }
                >
                  {selectedItem.status === true ? "Found" : "Returned"}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-slate-500">Description</Label>
              <p className="text-slate-700">{selectedItem.description}</p>
            </div>
            {selectedItem.status === false && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h4 className="font-semibold mb-2">Claimer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-500">Name</Label>
                    <p className="font-medium">
                      {selectedItem.claimer_name || "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-500">Phone</Label>
                    <p className="font-medium">
                      {selectedItem.claimer_phone || "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
