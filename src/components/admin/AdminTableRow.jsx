import React from "react";
import Image from "next/image";
import { CheckCircle, MapPin, Calendar } from "lucide-react";
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
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${
            item.status === true
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {item.status === true ? (
            <>
              <CheckCircle className="w-3 h-3 mr-1" />
              ยังอยู่
            </>
          ) : (
            <>
              <CheckCircle className="w-3 h-3 mr-1" />
              ส่งคืนแล้ว
            </>
          )}
        </span>
      </td>
    </tr>
  );
}
