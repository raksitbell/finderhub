import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import ItemCard from "@/components/items/ItemCard";
import ItemModal from "@/components/modals/ItemModal";

/**
 * AddItemPreview Component
 *
 * Displays a preview of the item to be added, allowing the user to review details before publishing.
 *
 * @param {Object} props
 * @param {Object} props.item - The item object to preview.
 * @param {Function} props.onBack - Callback to return to the edit form.
 * @param {Function} props.onConfirm - Callback to confirm and publish the item.
 */
export default function AddItemPreview({
  item,
  onBack,
  onConfirm,
  isUploading,
}) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide">
          <div className="flex flex-col items-center justify-center min-h-full space-y-6">
            <div className="w-full max-w-[280px] sm:max-w-xs cursor-pointer hover:scale-105 transition-transform duration-200">
              <ItemCard item={item} onClick={() => setIsDetailOpen(true)} />
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 w-full max-w-[280px] sm:max-w-xs">
              <p className="text-xs text-blue-600 leading-relaxed text-center">
                <strong>หมายเหตุ:</strong>{" "}
                โปรดตรวจสอบรายละเอียดทั้งหมดให้ถูกต้องก่อนเผยแพร่
                รายการนี้จะปรากฏบนแดชบอร์ดสาธารณะทันที
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 pt-2 shrink-0">
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isUploading}
              className="flex-1 h-12 rounded-xl border-slate-200 text-slate-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปแก้ไข
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={isUploading}
              className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl text-base font-medium shadow-lg shadow-emerald-200"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังเผยแพร่...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  ยืนยันการเผยแพร่
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <ItemModal
        item={item}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isAdmin={true}
      />
    </>
  );
}
