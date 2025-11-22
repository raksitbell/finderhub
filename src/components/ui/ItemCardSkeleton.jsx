import React from "react";

export default function ItemCardSkeleton() {
  return (
    <div className="flex-1 overflow-hidden bg-white border-slate-100 border rounded-[2.2rem] relative shadow-lg">
      {/* Hero image skeleton */}
      <div className="relative h-64 w-full bg-slate-200 animate-pulse">
        <div className="absolute top-4 left-4 right-4 flex items-start justify-end">
          <div className="w-9 h-9 rounded-full bg-slate-300/50"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mt-6 pr-6 pb-6 pl-6 space-y-6">
        <div className="space-y-3 border-b border-slate-100 pb-5">
          {/* Category badge */}
          <div className="h-4 w-24 bg-slate-200 rounded-full animate-pulse"></div>
          
          {/* Title */}
          <div className="h-7 w-3/4 bg-slate-200 rounded-lg animate-pulse"></div>
          
          {/* Location */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-200"></div>
            <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Action area skeleton */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
