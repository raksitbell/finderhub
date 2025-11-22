import React, { useState } from "react";
import { Filter, Plus } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import AdminTableFilters from "./AdminTableFilters";
import AdminTableRow from "./AdminTableRow";
import AdminMobileCard from "./AdminMobileCard";

export default function AdminTable({ items, onView, onAddItem, filterProps }) {
  const {
    setFilterStatus,
    setFilterCategory,
    setFilterLocation,
    setSortOrder,
    searchQuery,
    setSearchQuery,
  } = filterProps;

  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setFilterStatus("all");
    setFilterCategory("all");
    setFilterLocation("");
    setSortOrder("date_newest");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-b border-slate-200">
        <div>
          <h3 className="font-semibold text-xl tracking-tight font-sans text-slate-800">
            รายการทรัพย์สินที่พบ
          </h3>
          <p className="text-slate-500 text-sm mt-1 font-sans">
            จัดการและจัดการทรัพย์สินที่พบ
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="ค้นหา..."
              className="h-9"
              inputClassName="rounded-lg bg-slate-100 border-transparent focus:bg-white focus:border-slate-200 h-9 text-xs"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors font-sans h-9 ${
              showFilters
                ? "bg-slate-200 text-slate-800"
                : "text-slate-600 bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ตัวกรอง</span>
          </button>
          <button
            onClick={onAddItem}
            className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors font-sans h-9 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">เพิ่มรายการ</span>
            <span className="sm:hidden">เพิ่ม</span>
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <AdminTableFilters
        showFilters={showFilters}
        filterProps={filterProps}
        onClearFilters={handleClearFilters}
      />

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50">
              <th className="px-6 py-4 font-sans">รายการ</th>
              <th className="px-6 py-4 font-sans">หมวดหมู่</th>
              <th className="px-6 py-4 font-sans">วันที่</th>
              <th className="px-6 py-4 font-sans">สถานที่ที่พบ</th>
              <th className="px-6 py-4 font-sans">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((item) => (
              <AdminTableRow key={item.id} item={item} onView={onView} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-200">
        {items.map((item) => (
          <AdminMobileCard key={item.id} item={item} onView={onView} />
        ))}
      </div>
    </div>
  );
}
