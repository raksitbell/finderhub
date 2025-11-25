import React, { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PurgeModal({ isOpen, onOpenChange, onPurge }) {
  const [days, setDays] = useState(90);
  const [isConfirming, setIsConfirming] = useState(false);

  const handlePurge = async () => {
    setIsConfirming(true);
    await onPurge(days);
    setIsConfirming(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-red-100">
        <DialogHeader>
          <div className="mx-auto bg-red-100 p-3 rounded-full mb-4 w-fit">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-xl text-red-900">
            ล้างข้อมูลเก่า
          </DialogTitle>
          <DialogDescription className="text-center text-red-700">
            การกระทำนี้จะลบรายการที่สถานะ "พบแล้ว" และเก่ากว่าจำนวนวันที่กำหนด
            <br />
            <span className="font-bold">ไม่สามารถกู้คืนข้อมูลได้</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="days" className="text-right text-slate-600">
              เก่ากว่า (วัน)
            </Label>
            <Input
              id="days"
              type="number"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 0)}
              className="col-span-3 border-slate-200 focus:border-red-500 focus:ring-red-500"
              min="1"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200 hover:bg-slate-50 text-slate-700"
          >
            ยกเลิก
          </Button>
          <Button
            variant="destructive"
            onClick={handlePurge}
            disabled={isConfirming}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isConfirming ? "กำลังลบ..." : "ยืนยันการลบ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
