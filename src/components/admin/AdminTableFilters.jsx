import React from "react";
import { Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdminTableFilters({
  showFilters,
  filterProps,
  onClearFilters,
}) {
  if (!showFilters) return null;

  const {
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    filterLocation,
    setFilterLocation,
    sortOrder,
    setSortOrder,
  } = filterProps;

  return (
    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center gap-3 animate-in slide-in-from-top-2 duration-200">
      {/* Category Filter */}
      <div className="flex-1 min-w-[160px]">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="h-9 bg-white border-slate-200 w-full">
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs text-slate-500 flex-shrink-0">
                หมวดหมู่:
              </span>
              <SelectValue placeholder="ทั้งหมด" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="it_gadget">โทรศัพท์ / ไอที</SelectItem>
            <SelectItem value="personal">ของใช้ส่วนตัว</SelectItem>
            <SelectItem value="stationery">หนังสือ / เครื่องเขียน</SelectItem>
            <SelectItem value="other">อื่นๆ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort Order */}
      <div className="flex-1 min-w-[160px]">
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="h-9 bg-white border-slate-200 w-full">
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs text-slate-500 flex-shrink-0">
                เรียงตาม:
              </span>
              <SelectValue placeholder="ล่าสุด" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date_newest">วันที่: ล่าสุด</SelectItem>
            <SelectItem value="date_oldest">วันที่: เก่าสุด</SelectItem>
            <SelectItem value="name_asc">ชื่อ: ก-ฮ</SelectItem>
            <SelectItem value="name_desc">ชื่อ: ฮ-ก</SelectItem>
            <SelectItem value="category_asc">หมวดหมู่: ก-ฮ</SelectItem>
            <SelectItem value="category_desc">หมวดหมู่: ฮ-ก</SelectItem>
            <SelectItem value="status_found">สถานะ: เจอแล้วก่อน</SelectItem>
            <SelectItem value="status_returned">
              สถานะ: คืนแล้วก่อน
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location Filter */}
      <div className="flex-1 min-w-[160px]">
        <div className="h-9 bg-white border border-slate-200 rounded-md flex items-center px-3 w-full">
          <span className="text-xs text-slate-500 mr-2 flex-shrink-0">
            สถานที่:
          </span>
          <input
            type="text"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            placeholder="ระบุสถานที่..."
            className="bg-transparent text-sm w-full focus:outline-none min-w-0"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex-1 min-w-[160px]">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-9 bg-white border-slate-200 w-full">
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs text-slate-500 flex-shrink-0">
                สถานะ:
              </span>
              <SelectValue placeholder="ทั้งหมด" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="found">เจอแล้ว</SelectItem>
            <SelectItem value="returned">คืนแล้ว</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters Button */}
      <div className="ml-auto flex-none">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-9 text-slate-500 hover:text-slate-700 px-2"
          title="ล้างตัวกรอง"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
