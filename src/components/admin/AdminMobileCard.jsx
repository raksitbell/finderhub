import React from "react";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import ItemStatusBadge from "@/components/shared/ItemStatusBadge";

export default function AdminMobileCard({ item, onView }) {
  return (
    <div
      onClick={() => onView(item)}
      className="p-4 hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
          <Image
            src={item.image || "https://placehold.co/300x200?text=No+Image"}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100px, 100px"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-semibold text-slate-900 truncate pr-2">
              {item.name}
            </h4>
            <ItemStatusBadge
              status={item.status}
              className="text-[10px] px-2 py-0.5"
            />
          </div>

          <div className="flex items-center text-xs text-slate-500">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
              {item.categories?.label || item.category}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
