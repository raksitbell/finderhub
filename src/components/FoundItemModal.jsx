import { Box, MapPin, Clock, Building } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function FoundItemModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
          <Box className="h-8 w-8 text-slate-600" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-2">
            พบทรัพย์สินไม่มีเจ้าของ?
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            หากคุณพบทรัพย์สินที่ไม่มีเจ้าของ กรุณานำส่งที่ห้องธุรการ (Admin
            Office) เพื่อให้เจ้าหน้าที่ดำเนินการบันทึกและตามหาเจ้าของต่อไป
          </DialogDescription>
        </DialogHeader>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-left mb-4">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> สถานที่รับฝากของหาย
          </h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Building className="h-4 w-4 text-slate-400" />
              <span>อาคาร 11 ชั้น 1 (ห้อง Control Room)</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>เวลาทำการ: 08:30 - 16:30 น.</span>
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            รับทราบ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
