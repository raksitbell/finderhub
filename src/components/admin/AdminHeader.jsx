"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LogOut,
  Home,
  User,
  Code,
  Menu,
  X,
} from "lucide-react";
import KeyMetrics from "@/components/dashboard/KeyMetrics";
import FinderHubLogo from "@/components/common/FinderHubLogo";

export default function AdminHeader({ stats, userEmail, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
    <header className="relative overflow-hidden bg-blue-900 bg-[url('/images/dashboard.png')] bg-cover rounded-3xl mb-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/dev"
            className="flex items-center gap-2 px-3 py-2 md:px-4 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            title="Developer Documentation"
          >
            <Code className="h-4 w-4" />
            <span>Dev</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 md:px-4 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            title="Back to Home"
          >
            <Home className="h-4 w-4" />
            <span>หน้าหลัก</span>
          </Link>

          <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 border border-white/20">
            <User className="w-4 h-4 text-white sm:mr-2" />
            <span className="text-white text-sm font-medium">
              {userEmail?.split("@")[0]}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 md:px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
           <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
            <User className="w-4 h-4 text-white mr-2" />
            <span className="text-white text-sm font-medium">
              {userEmail?.split("@")[0]}
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

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

    {/* Mobile Menu Dropdown - Moved outside header to avoid overflow/stacking context issues */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-[100] bg-blue-950/95 backdrop-blur-md flex flex-col justify-center p-6 animate-in slide-in-from-right-10 fade-in duration-200">
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-8 w-8" />
        </button>

        <div className="flex flex-col space-y-4 max-w-md mx-auto w-full">
          <Link
            href="/dev"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 px-6 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-2xl transition-colors text-lg"
          >
            <Code className="h-6 w-6" />
            <span className="font-medium">Developer Documentation</span>
          </Link>

          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 px-6 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-2xl transition-colors text-lg"
          >
            <Home className="h-6 w-6" />
            <span className="font-medium">หน้าหลัก</span>
          </Link>

          <div className="h-px bg-white/10 my-2" />

          <button
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-4 px-6 py-4 text-red-200 hover:text-red-100 hover:bg-red-500/10 rounded-2xl transition-colors w-full text-left text-lg"
          >
            <LogOut className="h-6 w-6" />
            <span className="font-medium">ออกจากระบบ</span>
          </button>
        </div>
      </div>
    )}
    </>
  );
}
