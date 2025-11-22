"use client";

import { Box, Smartphone, ShoppingBag, Book, CircleHelp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: "all", label: "หมวดหมู่ทั้งหมด", icon: Box },
  { id: "it_gadget", label: "โทรศัพท์ / อุปกรณ์ไอที", icon: Smartphone },
  { id: "personal", label: "ของใช้ส่วนตัว", icon: ShoppingBag },
  { id: "stationery", label: "เครื่องเขียน / อุปกรณ์สำนักงาน", icon: Book },
  { id: "other", label: "อื่นๆ", icon: CircleHelp },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  // Handle "all" as empty string for logic, but "all" for select value
  const currentValue = activeCategory === "" ? "all" : activeCategory;

  const handleValueChange = (value) => {
    onCategoryChange(value === "all" ? "" : value);
  };

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white focus:ring-white/20 focus:ring-offset-0 text-base [&>svg]:text-white [&>svg]:opacity-100 items-center">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <SelectItem key={category.id} value={category.id}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
