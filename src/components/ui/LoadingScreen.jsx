import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin inline-block w-12 h-12 border-[4px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight font-sans">
          FinderHub
        </h2>
        <p className="text-sm text-slate-500 font-sans animate-pulse">
          กำลังโหลดข้อมูล...
        </p>
      </div>
    </div>
  );
}
