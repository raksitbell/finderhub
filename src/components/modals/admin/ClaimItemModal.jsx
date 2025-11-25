import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ClaimItemModal({
  isOpen,
  onOpenChange,
  claimData,
  setClaimData,
  onClaimItem,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ยืนยันการส่งคืนเจ้าของ</DialogTitle>
          <DialogDescription>
            กรุณากรอกรายละเอียดเพื่อยืนยันการส่งคืน
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onClaimItem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="claimerName">ชื่อผู้รับคืน</Label>
            <Input
              id="claimerName"
              value={claimData.claimerName}
              onChange={(e) =>
                setClaimData({ ...claimData, claimerName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimerPhone">เบอร์โทรศัพท์</Label>
            <Input
              id="claimerPhone"
              value={claimData.claimerPhone}
              onChange={(e) =>
                setClaimData({ ...claimData, claimerPhone: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimerSocial">ช่องทางติดต่อโซเชียลมีเดีย</Label>
            <Input
              id="claimerSocial"
              value={claimData.claimerSocial}
              onChange={(e) =>
                setClaimData({ ...claimData, claimerSocial: e.target.value })
              }
              placeholder="เช่น Facebook, Line ID"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proofEvidence">หลักฐานการรับคืน (รูปภาพ)</Label>
            <Input
              id="proofEvidence"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setClaimData({ ...claimData, proofEvidence: e.target.files[0] })
              }
            />
          </div>
          <DialogFooter>
            <Button type="submit">ยืนยันการส่งคืนเจ้าของ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
