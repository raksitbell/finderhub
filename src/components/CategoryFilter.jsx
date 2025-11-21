"use client";

import { Box, Smartphone, ShoppingBag, Book, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "", label: "ทั้งหมด", icon: Box },
  { id: "ทั่วไป", label: "ทั่วไป", icon: CircleHelp },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        return (
          <Button
            key={category.id}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "rounded-full px-6 gap-2 transition-all",
              isActive
                ? "bg-slate-800 hover:bg-slate-900 text-white shadow-md"
                : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            <Icon className="h-4 w-4" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
}
