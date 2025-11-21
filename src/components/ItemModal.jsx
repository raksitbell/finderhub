import Image from "next/image";
import { MapPin, Calendar, Tag, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ItemModal({ item, isOpen, onClose }) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0">
        <div className="relative h-64 w-full bg-slate-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white text-slate-500"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-sm">
                {item.category}
              </Badge>
              <span className="text-xs text-slate-400">ID: {item.id}</span>
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              {item.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  สถานที่พบ
                </p>
                <p className="text-slate-600">{item.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  วันที่พบ
                </p>
                <p className="text-slate-600">{item.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  รายละเอียดเพิ่มเติม
                </p>
                <p className="text-slate-600">
                  {item.description || "ไม่มีรายละเอียดเพิ่มเติม"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2">
              ต้องการรับของคืน?
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              กรุณาติดต่อห้องธุรการ (Admin Office) พร้อมหลักฐานแสดงความเป็นเจ้าของ
            </p>
            <div className="text-sm text-slate-500">
              <p>📍 อาคาร 11 ชั้น 1 (ห้อง Control Room)</p>
              <p>⏰ เวลาทำการ: 08:30 - 16:30 น.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
