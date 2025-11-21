"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar({ onFoundItemClick, onSearchChange }) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:h-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/FinderHub.png"
              alt="FinderHub"
              width={150}
              height={40}
              className="h-6 md:h-8 w-auto"
              priority
            />
          </Link>

          {/* Mobile Action Button */}
          <div className="md:hidden">
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full px-4 font-medium bg-red-500 hover:bg-red-600 text-white shadow-md"
              onClick={onFoundItemClick}
            >
              แจ้งของหาย
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:flex-1 md:max-w-2xl relative">
          <Input
            type="text"
            placeholder="ค้นหาด้วย 'ประเภท', 'ชื่อ', 'สถานที่', ..."
            className="w-full rounded-full pl-6 pr-12 h-10 md:h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors text-sm md:text-base"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-slate-100 text-slate-500 h-8 w-8 md:h-10 md:w-10"
          >
            <Search className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        {/* Desktop Action Button */}
        <div className="hidden md:block flex-shrink-0">
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
