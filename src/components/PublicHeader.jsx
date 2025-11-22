import React from "react";
import Link from "next/link";
import { CheckCircle, Lock } from "lucide-react";
import KeyMetrics from "@/components/KeyMetrics";
import FinderHubLogo from "@/components/FinderHubLogo";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

export default function PublicHeader({
  stats,
  searchQuery,
  setSearchQuery,
  activeCategory,
  onCategoryChange,
  onFoundItemClick,
}) {
  return (
    <header className="relative overflow-hidden bg-teal-800 bg-[url('/images/dashboard.png')] bg-cover rounded-3xl mb-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-8 pt-6">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center backdrop-blur p-2 hover:bg-white/20 transition-colors">
              <FinderHubLogo />
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onFoundItemClick}
            className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
            title="Report Found Item"
          >
            <CheckCircle className="w-4 h-4" />
            <span>พบทรัพย์สินไม่มีเจ้าของ</span>
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 lg:px-8 lg:pb-20 pt-12 pr-6 pb-12 pl-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-3 font-sans font-medium">
              Lost & Found
            </h1>
            <p className="text-white/80 text-lg font-light mb-8 font-sans">
              ค้นหา และ รับทรัพย์สินที่คุณทำสูญหายง่ายๆ ได้ที่นี่
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl w-full">
              <div className="flex-1 w-full">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="ค้นหาทรัพย์สินของคุณ..."
                  className="h-12 w-full"
                  inputClassName="rounded-2xl bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 h-12 text-base shadow-lg w-full"
                  iconClassName="text-white/80 hover:text-white hover:bg-white/10"
                />
              </div>

              <div className="flex-1 w-full">
                <CategoryFilter
                  activeCategory={activeCategory}
                  onCategoryChange={onCategoryChange}
                />
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <KeyMetrics stats={stats} variant="public" />
        </div>
      </div>
    </header>
  );
}
