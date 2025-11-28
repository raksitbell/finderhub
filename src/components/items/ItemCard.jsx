import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * ItemCard Component
 *
 * Displays a summary card for a found item, including image, status, and key details.
 * Used in the public dashboard, admin dashboard, and item preview.
 *
 * @param {Object} props
 * @param {Object} props.item - The item object to display.
 * @param {Function} props.onClick - Callback function when the card is clicked.
 */
export default function ItemCard({ item, onClick }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const isFound = item.status === true;

  return (
    <div
      onClick={onClick}
      className="flex-1 overflow-hidden bg-white border-slate-100 border rounded-[2.2rem] relative shadow-2xl cursor-pointer group hover:border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Hero image */}
      <div className="relative h-48 sm:h-64 w-full shadow-inner bg-slate-100">
        {isImageLoading && (
          <div className="absolute inset-0 z-10 animate-pulse bg-slate-200" />
        )}
        <Image
          src={item.image || "https://placehold.co/600x400?text=No+Image"}
          alt={item.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsImageLoading(false)}
        />
        <div className="bg-gradient-to-t from-black/60 via-transparent to-transparent absolute top-0 right-0 bottom-0 left-0"></div>

        <div className="absolute top-4 left-4 right-4 flex items-start justify-end">
          {/* Menu button */}
          <button
            className="flex outline-none flex-none text-white bg-black/40 w-9 h-9 border-white/20 border rounded-full backdrop-blur-md items-center justify-center hover:bg-black/60 transition-colors"
            type="button"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content under hero */}
      <div className="mt-4 sm:mt-6 pr-4 sm:pr-6 pb-4 sm:pb-6 pl-4 sm:pl-6 space-y-4 sm:space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <p className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em] font-sans">
            {item.categories?.label || item.category}
          </p>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 font-sans line-clamp-1 group-hover:text-slate-600 transition-colors">
            {item.name}
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-sans mt-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
        </div>

        {/* Action area */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 group/btn">
            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover/btn:bg-slate-200 group-hover/btn:text-slate-900 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="text-slate-700 font-bold font-sans group-hover/btn:text-slate-900 transition-colors">
                ดูรายละเอียด
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
