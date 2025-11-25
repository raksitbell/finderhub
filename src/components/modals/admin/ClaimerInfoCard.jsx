import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

/**
 * ClaimerInfoCard Component
 *
 * Displays information about the person who claimed an item.
 * Only visible when an item has been returned (status is false).
 *
 * @param {Object} props
 * @param {string} props.claimerName - The name of the claimer.
 * @param {string} props.claimerPhone - The phone number of the claimer.
 * @param {string} [props.claimerSocial] - Social media contact of the claimer.
 * @param {string} [props.proofImageUrl] - URL of the image proving the item was returned.
 */
export default function ClaimerInfoCard({
  claimerName,
  claimerPhone,
  claimerSocial,
  proofImageUrl,
}) {
  return (
    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
      <h4 className="text-sm font-bold text-blue-900 mb-3">
        ชื่อผู้รับสิ่งของคืน
      </h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-blue-500 block text-xs font-medium mb-1">
            ชื่อ
          </span>
          <span className="text-blue-900 font-bold">{claimerName || "-"}</span>
        </div>
        <div>
          <span className="text-blue-500 block text-xs font-medium mb-1">
            เบอร์โทรศัพท์
          </span>
          <span className="text-blue-900 font-bold">{claimerPhone || "-"}</span>
        </div>
        {claimerSocial && (
          <div className="col-span-2">
            <span className="text-blue-500 block text-xs font-medium mb-1">
              ช่องทางติดต่อโซเชียลมีเดีย
            </span>
            <span className="text-blue-900 font-bold">{claimerSocial}</span>
          </div>
        )}
        {proofImageUrl && (
          <div className="col-span-2">
            <span className="text-blue-500 block text-xs font-medium mb-1">
              หลักฐานการรับคืน
            </span>
            <div className="relative h-48 w-full rounded-lg overflow-hidden border border-blue-200">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={proofImageUrl}
                    alt="หลักฐานการรับคืน"
                    className="object-cover w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
                  <DialogTitle className="sr-only">หลักฐานการรับคืน</DialogTitle>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={proofImageUrl}
                      alt="หลักฐานการรับคืน"
                      className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                    />
                    <DialogClose className="absolute -top-10 right-0 rounded-full bg-white/10 hover:bg-white/20 text-white p-2 transition-colors">
                      <X className="h-6 w-6" />
                      <span className="sr-only">ปิด</span>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
