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
          <DialogTitle>Confirm Return</DialogTitle>
          <DialogDescription>
            Please enter the claimer's details to confirm the return.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onClaimItem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="claimerName">Claimer Name</Label>
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
            <Label htmlFor="claimerPhone">Phone Number</Label>
            <Input
              id="claimerPhone"
              value={claimData.claimerPhone}
              onChange={(e) =>
                setClaimData({ ...claimData, claimerPhone: e.target.value })
              }
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Confirm Return</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
