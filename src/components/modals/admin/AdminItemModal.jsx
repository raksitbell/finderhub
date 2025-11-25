import React from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  CheckCircle,
  Trash2,
  X,
  Tag,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ItemStatusBadge from "@/components/items/ItemStatusBadge";
import ItemDetailRow from "@/components/items/ItemDetailRow";
import ClaimerInfoCard from "./ClaimerInfoCard";

/**
 * AdminItemModal Component
 *
 * Displays detailed information about a specific item for administrators.
 * Allows admins to view details, claim items (mark as returned), or delete items.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {Function} props.onOpenChange - Callback to update the open state.
 * @param {Object} props.item - The item object to display.
 * @param {Function} props.onClaim - Callback to handle claiming the item.
 * @param {Function} props.onDelete - Callback to handle deleting the item.
 * @param {Function} props.onEdit - Callback to handle editing the item (currently unused in this view).
 */
export default function AdminItemModal({
  isOpen,
  onOpenChange,
  item,
  onClaim,
  onDelete,
  onEdit,
}) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-0 gap-0 bg-slate-50 border-slate-100 text-slate-900">
        {/* Item Image Header */}
        <div className="relative h-72 w-full bg-slate-50">
          <Image
            src={item.image || "https://placehold.co/600x400?text=No+Image"}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <DialogClose className="absolute right-4 top-4 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors z-10 p-2">
            <X className="h-5 w-5" />
            <span className="sr-only">ปิด</span>
          </DialogClose>
        </div>

        <div className="px-8 pb-8 relative z-10">
          <DialogHeader className="mb-6 text-left pt-6">
            <div className="flex items-center justify-between mb-4">
              {/* Category Badge */}
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                {item.categories?.label || item.category}
              </span>
              {/* Status Badge */}
              <ItemStatusBadge status={item.status} />
            </div>
            <DialogTitle className="text-3xl font-bold text-slate-900 mb-2 font-sans">
              {item.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              รายละเอียดสำหรับผู้ดูแลระบบ: {item.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Location Details */}
            <ItemDetailRow
              icon={MapPin}
              label="สถานที่พบ"
              value={item.location}
              iconColor="text-red-500"
            />

            {/* Description Details */}
            <ItemDetailRow
              icon={Tag}
              label="รายละเอียด"
              value={item.description || "ไม่มีรายละเอียดเพิ่มเติม"}
              iconColor="text-purple-500"
            />

            {/* Date Found Details */}
            <ItemDetailRow
              icon={Calendar}
              label="วันที่พบ"
              value={new Date(item.date).toLocaleDateString("th-TH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              iconColor="text-blue-500"
            />

            {/* Claimer Info (Visible only if item is returned) */}
            {item.status === false && (
              <ClaimerInfoCard
                claimerName={item.claimer_name}
                claimerPhone={item.claimer_phone}
              />
            )}

            {/* Admin Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex gap-3">
              {item.status === true && (
                <Button
                  onClick={() => onClaim(item)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl shadow-lg shadow-emerald-100"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  ยืนยันการคืน
                </Button>
              )}

              <Button
                variant="destructive"
                onClick={async () => {
                  await onDelete(item.id);
                  onOpenChange(false);
                }}
                className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border-0 shadow-none h-12 rounded-xl"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                ลบรายการ
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

