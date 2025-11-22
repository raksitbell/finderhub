import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import AddItemPreview from "./AddItemPreview";
import AddItemForm from "./AddItemForm";

/**
 * AddItemModal Component
 *
 * A modal dialog that guides the user through a 2-step process to add a new found item.
 * Step 1: Fill out the item details form (AddItemForm).
 * Step 2: Review the item card preview (AddItemPreview) before publishing.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {Function} props.onOpenChange - Callback to update the open state.
 * @param {Object} props.newItem - State object containing the new item's data.
 * @param {Function} props.setNewItem - Function to update the newItem state.
 * @param {Function} props.onAddItem - Callback function to submit the new item to the database.
 * @param {Function} props.onImageUpload - Callback function to handle image file uploads.
 */
export default function AddItemModal({
  isOpen,
  onOpenChange,
  newItem,
  setNewItem,
  onAddItem,
  onImageUpload,
}) {
  // State to track if the user is in the preview step
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  // State to store the original filename of the uploaded image for display purposes
  const [fileName, setFileName] = useState("");

  /**
   * Handles the form submission.
   * If in edit mode, it switches to preview mode.
   * If in preview mode, it calls the final onAddItem callback.
   *
   * @param {Event} e - The form submission event.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isPreviewMode) {
      onAddItem(e);
    } else {
      setIsPreviewMode(true);
    }
  };

  /**
   * Handles file input changes.
   * Captures the filename immediately for display and calls the parent's upload handler.
   *
   * @param {Event} e - The file input change event.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onImageUpload(e);
    }
  };

  const categoryLabels = {
    it_gadget: "โทรศัพท์ / ไอที",
    personal: "ของใช้ส่วนตัว",
    stationery: "หนังสือ / เครื่องเขียน",
    other: "อื่นๆ",
  };

  // Construct a temporary item object for the preview card
  const previewItem = {
    ...newItem,
    status: true,
    categories: {
      label: categoryLabels[newItem.category] || "อื่นๆ",
    },
    image: newItem.image || null,
  };

  // Reset internal state when the modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setIsPreviewMode(false);
      setFileName("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-xl max-h-[90vh] overflow-hidden p-0 gap-0 bg-slate-50 border-slate-100 text-slate-900 flex flex-col"
      >
        {/* Custom Close Button */}
        <div className="absolute right-4 top-4 z-10">
          <DialogClose className="rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors p-2">
            <X className="h-5 w-5" />
            <span className="sr-only">ปิด</span>
          </DialogClose>
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          {/* Modal Header */}
          <DialogHeader className="px-8 pt-10 pb-2 text-left shrink-0">
            <DialogTitle className="text-3xl font-bold text-slate-900 mb-2 font-sans">
              {isPreviewMode ? "ตรวจสอบรายละเอียด" : "เพิ่มรายการทรัพย์สิน"}
            </DialogTitle>
            <p className="text-slate-500 font-sans">
              {isPreviewMode
                ? "โปรดตรวจสอบรายละเอียดทั้งหมดให้ถูกต้องก่อนเผยแพร่"
                : "กรุณากรอกรายละเอียดของทรัพย์สินที่พบ"}
            </p>
          </DialogHeader>

          {/* Conditional Rendering: Form vs Preview */}
          {!isPreviewMode ? (
            <AddItemForm
              newItem={newItem}
              setNewItem={setNewItem}
              onSubmit={handleFormSubmit}
              onFileChange={handleFileChange}
              fileName={fileName}
            />
          ) : (
            <AddItemPreview
              item={previewItem}
              onBack={() => setIsPreviewMode(false)}
              onConfirm={handleFormSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
