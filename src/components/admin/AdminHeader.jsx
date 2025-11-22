import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LogOut,
  Home,
  User,
} from "lucide-react";
import KeyMetrics from "@/components/KeyMetrics";
import FinderHubLogo from "@/components/FinderHubLogo";

export default function AdminHeader({ stats, userEmail, onLogout }) {
  return (
    <header className="relative overflow-hidden bg-teal-800 bg-[url('/images/dashboard.png')] bg-cover rounded-3xl mb-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-8 pt-6">
        <div className="flex items-center space-x-8">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="flex items-center justify-center backdrop-blur p-2 hover:bg-white/20 transition-colors">
              <FinderHubLogo />
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 md:px-4 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            title="Back to Home"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">หน้าหลัก</span>
          </Link>

          <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 border border-white/20">
            <User className="w-4 h-4 text-white sm:mr-2" />
            <span className="text-white text-sm font-medium hidden sm:inline">
              {userEmail?.split("@")[0]}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 md:px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">ออกจากระบบ</span>
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      {/* Hero Content */}
      <div className="relative z-10 lg:px-8 lg:pb-20 pt-12 pr-6 pb-12 pl-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-3 font-sans font-medium">
              แดชบอร์ด
            </h1>
            <p className="text-white/80 text-lg font-light mb-8 font-sans">
              ระบบจัดการทรัพย์สินสูญหาย
            </p>
          </div>

          {/* Key Metrics */}
          <KeyMetrics stats={stats} variant="admin" />
        </div>
      </div>
    </header>
  );
}
