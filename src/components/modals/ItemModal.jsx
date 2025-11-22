import Image from "next/image";
import {
  MapPin,
  Calendar,
  Tag,
  X,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getRelativeTime } from "@/lib/utils";
import ItemDetailRow from "@/components/ItemDetailRow";

export default function ItemModal({ item, isOpen, onClose }) {
  if (!item) return null;

  const isFound = item.status === true;
  const statusText = isFound ? "Found" : "Returned";
  const statusColor = isFound ? "text-slate-900" : "text-slate-500";
  const statusBg = isFound ? "bg-slate-100" : "bg-slate-100";
  const statusIcon = isFound ? (
    <CheckCircle className="w-4 h-4" />
  ) : (
    <XCircle className="w-4 h-4" />
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-0 gap-0 bg-slate-50 border-slate-100 text-slate-900">
        <div className="relative h-72 w-full bg-slate-50">
          <Image
            src={item.image || "https://placehold.co/600x400?text=No+Image"}
            alt={item.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors z-10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-8 pb-8 relative z-10">
          <DialogHeader className="mb-6 text-left pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                {item.categories?.label || item.category}
              </span>
            </div>
            <DialogTitle className="text-3xl font-bold text-slate-900 mb-2 font-sans">
              {item.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <ItemDetailRow
              icon={MapPin}
              label="สถานที่พบ"
              value={item.location}
              iconColor="text-red-500"
            />

            <ItemDetailRow
              icon={Tag}
              label="รายละเอียด"
              value={item.description || "No additional description provided."}
              iconColor="text-purple-500"
            />

            <ItemDetailRow
              icon={Calendar}
              label="วันที่พบ"
              value={new Date(item.date).toLocaleDateString("th-TH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              iconColor="text-blue-500"
            />

            {/* Return Info */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4">วิธีในการรับคืน?</h4>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-sm text-slate-700 mb-4 leading-relaxed font-medium">
                  โปรดติดต่อที่ห้องควบคุม พร้อมนำบัตรประจำตัว และหลักฐานอื่นๆ เพื่อแสดงความเป็นเจ้าของทรัพย์สิน
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 opacity-70" />
                    <span>อาคาร 11 ชั้น 1 (ห้องควบคุม)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Clock className="w-4 h-4 opacity-70" />
                    <span>เวลาทำการ: 08:30 - 16:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8">
            <Button
              onClick={onClose}
              className="w-full bg-slate-900 text-white hover:bg-slate-800 h-12 text-base font-medium rounded-xl transition-colors shadow-lg shadow-slate-200"
            >
              ปิด
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
