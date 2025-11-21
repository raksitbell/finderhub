import React from "react";

export default function AdminStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
          Total Items
        </h3>
        <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
          Found
        </h3>
        <p className="text-4xl font-bold text-green-600">{stats.found}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
          Returned
        </h3>
        <p className="text-4xl font-bold text-slate-600">{stats.returned}</p>
      </div>
    </div>
  );
}
