import Image from "next/image";
import { MapPin, Calendar, Tag, X, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ItemModal({ item, isOpen, onClose }) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-0 gap-0">
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
            className="absolute right-3 top-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors z-10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold flex gap-2 text-slate-800">
              <span>{item.name} </span>
              <Badge variant="secondary" className="text-sm">
                {item.categories?.label || item.category}
              </Badge>
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
                <p className="text-slate-600">
                  {new Date(item.date).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
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
              กรุณาติดต่อห้องควบคุม (Control Room) พร้อมหลักฐานแสดงความเป็นเจ้าของ
            </p>
            <div className="text-sm text-slate-500 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>อาคาร 11 ชั้น 1 (ห้อง Control Room)</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>เวลาทำการ: 08:30 - 16:30 น.</span>
              </p>
            </div>
          </div>
          <DialogFooter className="py-6 pt-2">
            <Button onClick={onClose} className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-base font-medium rounded-lg transition-colors">
              รับทราบ
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
