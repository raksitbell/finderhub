import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Upload, MapPin, User, ArrowRight } from "lucide-react";

/**
 * AddItemForm Component
 *
 * Renders the form fields for adding a new item.
 *
 * @param {Object} props
 * @param {Object} props.newItem - The current state of the new item being added.
 * @param {Function} props.setNewItem - Function to update the newItem state.
 * @param {Function} props.onSubmit - Function to handle form submission (transition to preview).
 * @param {Function} props.onFileChange - Function to handle file input changes.
 * @param {string} props.fileName - The name of the currently selected file.
 */
export default function AddItemForm({
  newItem,
  setNewItem,
  onSubmit,
  onFileChange,
  fileName,
}) {
  /**
   * Sets the date field to the current date and time.
   */
  const setNow = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setNewItem({ ...newItem, date: now.toISOString().slice(0, 16) });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
        <form
          id="addItemForm"
          onSubmit={onSubmit}
          className="space-y-6 h-full flex flex-col"
        >
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-slate-900 font-medium">
              รูปภาพ
            </Label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-white hover:bg-slate-50 transition-colors cursor-pointer relative group">
              <Input
                id="image"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6 text-slate-400" />
              </div>
              {fileName || newItem.image ? (
                <p className="text-sm text-emerald-600 font-medium truncate max-w-[200px]">
                  {fileName || newItem.image.split("/").pop()}
                </p>
              ) : (
                <p className="text-sm text-slate-600 font-medium">
                  คลิกเพื่ออัปโหลดรูปภาพ
                </p>
              )}
              <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF</p>
            </div>
          </div>

          {/* Item Name */}
          <div className="space-y-2">
            <Label htmlFor="itemName" className="text-slate-900 font-medium">
              ชื่อรายการ
            </Label>
            <Input
              id="itemName"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
              className="bg-white border-slate-200 focus:border-slate-400 rounded-xl h-12"
              placeholder="ชื่อสิ่งของ"
            />
          </div>

          {/* Category and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-900 font-medium">
                หมวดหมู่
              </Label>
              <Select
                value={newItem.category}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, category: value })
                }
              >
                <SelectTrigger className="bg-white border-slate-200 focus:border-slate-400 rounded-xl h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it_gadget">โทรศัพท์ / ไอที</SelectItem>
                  <SelectItem value="personal">ของใช้ส่วนตัว</SelectItem>
                  <SelectItem value="stationery">
                    หนังสือ / เครื่องเขียน
                  </SelectItem>
                  <SelectItem value="other">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFound" className="text-slate-900 font-medium">
                วันที่ & เวลาที่พบ
              </Label>
              <div className="flex gap-2">
                <Input
                  id="dateFound"
                  type="datetime-local"
                  value={newItem.date}
                  onChange={(e) =>
                    setNewItem({ ...newItem, date: e.target.value })
                  }
                  required
                  className="flex-1 bg-white border-slate-200 focus:border-slate-400 rounded-xl h-12"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={setNow}
                  className="h-12 rounded-xl border-slate-200"
                >
                  ตอนนี้
                </Button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-900 font-medium">
              สถานที่ที่พบ
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="location"
                value={newItem.location}
                onChange={(e) =>
                  setNewItem({ ...newItem, location: e.target.value })
                }
                required
                className="pl-10 bg-white border-slate-200 focus:border-slate-400 rounded-xl h-12"
                placeholder="สถานที่ที่พบ"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-900 font-medium">
              รายละเอียด
            </Label>
            <Textarea
              id="description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              required
              className="bg-white border-slate-200 focus:border-slate-400 rounded-xl min-h-[100px] resize-none"
              placeholder="กรอกรายละเอียด (สี, ตำหนิ, อื่นๆ)"
            />
          </div>

          {/* Contact / Return Location */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-slate-900 font-medium">
              สถานที่รับของคืน
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="contact"
                value={newItem.contact}
                onChange={(e) =>
                  setNewItem({ ...newItem, contact: e.target.value })
                }
                placeholder="ห้อง Control Room ชั้น 1"
                required
                className="pl-10 bg-white border-slate-200 focus:border-slate-400 rounded-xl h-12"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Footer Actions */}
      <DialogFooter className="px-4 md:px-8 pb-8 pt-2 shrink-0">
        <Button
          type="submit"
          form="addItemForm"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl text-base font-medium shadow-lg shadow-slate-200"
        >
          ต่อไป: ตรวจสอบ
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogFooter>
    </>
  );
}
