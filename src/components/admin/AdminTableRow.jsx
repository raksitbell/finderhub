import React from "react";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import ItemStatusBadge from "@/components/shared/ItemStatusBadge";
import { getRelativeTime } from "@/lib/utils";

export default function AdminTableRow({ item, onView }) {
  return (
    <tr
      onClick={() => onView(item)}
      className="hover:bg-slate-50 transition-colors cursor-pointer group"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
            <Image
              src={item.image || "https://placehold.co/300x200?text=No+Image"}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              sizes="40px"
            />
          </div>
          <span className="font-medium font-sans text-slate-900 group-hover:text-emerald-600 transition-colors">
            {item.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-sans text-slate-600">
            {item.categories?.label || item.category}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <div className="flex flex-col">
            <span className="text-sm font-medium font-sans text-slate-700">
              {new Date(item.date).toLocaleDateString()}
            </span>
            <span className="text-xs text-slate-400 font-sans">
              {getRelativeTime(item.date)}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600 font-sans">
            {item.location}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <ItemStatusBadge status={item.status} showIcon={true} />
      </td>
    </tr>
  );
}
