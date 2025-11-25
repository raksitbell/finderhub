import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ItemStatusBadge Component
 *
 * Displays the status of an item (Found/Returned) with consistent styling.
 *
 * @param {Object} props
 * @param {boolean} props.status - The status of the item (true = Found/ยังอยู่, false = Returned/คืนแล้ว).
 * @param {string} [props.className] - Additional classes to apply to the badge.
 * @param {boolean} [props.showIcon=false] - Whether to show the status icon.
 */
export default function ItemStatusBadge({ status, className, showIcon = false }) {
  const isFound = status === true;

  return (
    <Badge
      variant={isFound ? "default" : "secondary"}
      className={cn(
        "font-sans border-0 pointer-events-none", // pointer-events-none because it's usually just a label
        isFound
          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
        className
      )}
    >
      {showIcon && <CheckCircle className="w-3 h-3 mr-1" />}
      {isFound ? "ยังอยู่" : "คืนแล้ว"}
    </Badge>
  );
}
