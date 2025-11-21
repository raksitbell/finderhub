import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddItemModal({
  isOpen,
  onOpenChange,
  newItem,
  setNewItem,
  onAddItem,
  onImageUpload,
}) {
  const setNow = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setNewItem({ ...newItem, date: now.toISOString().slice(0, 16) });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={onAddItem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, category: value })
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it_gadget">โทรศัพท์ / ไอที</SelectItem>
                  <SelectItem value="personal">ของใช้ส่วนตัว</SelectItem>
                  <SelectItem value="stationery">หนังสือ / เครื่องเขียน</SelectItem>
                  <SelectItem value="other">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFound">Date & Time Found</Label>
              <div className="flex gap-2">
                <Input
                  id="dateFound"
                  type="datetime-local"
                  value={newItem.date}
                  onChange={(e) =>
                    setNewItem({ ...newItem, date: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={setNow}>
                  ตอนนี้
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location Found</Label>
            <Input
              id="location"
              value={newItem.location}
              onChange={(e) =>
                setNewItem({ ...newItem, location: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Item Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={onImageUpload}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">สถานที่รับของคืน</Label>
            <Input
              id="contact"
              value={newItem.contact}
              onChange={(e) =>
                setNewItem({ ...newItem, contact: e.target.value })
              }
              placeholder="ห้อง Control Room ชั้น 1"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">เพิ่มรายการ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
