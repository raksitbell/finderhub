"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar({ onFoundItemClick, onSearchChange }) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/FinderHub.png"
            alt="FinderHub"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <Input
            type="text"
            placeholder="ค้นหาด้วย 'ประเภท', 'ชื่อ', 'สถานที่', ..."
            className="w-full rounded-full pl-6 pr-12 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <Button
            variant="destructive"
            className="rounded-full px-6 font-medium bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all"
            onClick={onFoundItemClick}
          >
            พบทรัพย์สินไม่มีเจ้าของ ?
          </Button>
        </div>
      </div>
    </nav>
  );
}
