import React from "react";
import { Filter, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

export default function AdminFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  sortOrder,
  setSortOrder,
  showFilters,
  setShowFilters,
  onRefresh,
  isLoading,
}) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex justify-end gap-2">
        <Button
          variant={showFilters ? "secondary" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          title="Refresh Data"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {showFilters && (
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm animate-in slide-in-from-top-2 duration-200 flex justify-between flex-col sm:flex-row gap-2">
          <div className="flex flex-wrap items-center gap-3 w-full">
            <div className="w-full sm:max-w-xs">
              <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="w-full sm:max-w-xs">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-9 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Status:</span>
                    <SelectValue placeholder="All" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:max-w-xs">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="h-9 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Category:</span>
                    <SelectValue placeholder="All" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="it_gadget">โทรศัพท์ / ไอที</SelectItem>
                  <SelectItem value="personal">ของใช้ส่วนตัว</SelectItem>
                  <SelectItem value="stationery">หนังสือ / เครื่องเขียน</SelectItem>
                  <SelectItem value="other">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:max-w-xs">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="h-9 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Sort:</span>
                    <SelectValue placeholder="Newest" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="ml-auto flex-1 grow-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterStatus("all");
                setFilterCategory("all");
                setSortOrder("newest");
                setSearch("");
              }}
              className="h-9 text-slate-500 hover:text-slate-700 px-2"
              title="Clear Filters"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
