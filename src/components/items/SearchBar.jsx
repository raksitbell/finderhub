import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SearchBar({
  value,
  onChange,
  placeholder = "ค้นหา... ",
  className = "",
  inputClassName = "",
  iconClassName = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-6 pr-12 h-full bg-slate-50 border-slate-200 focus:bg-white transition-colors text-sm rounded-full",
          inputClassName
        )}
      />
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-slate-100 text-slate-500 h-10 w-10",
          iconClassName
        )}
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
