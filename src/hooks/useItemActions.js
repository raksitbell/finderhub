import { DataManager } from "@/lib/data";
import { toast } from "sonner";

/**
 * Custom hook to manage item actions (CRUD, Image Upload, Claims).
 * @param {Function} onSuccess - Callback function to run after a successful action (usually to reload data).
 * @returns {Object} Action functions.
 */
export function useItemActions(onSuccess) {
  const deleteItem = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const promise = DataManager.deleteItem(id);
      toast.promise(promise, {
        loading: "Deleting item...",
        success: () => {
          if (onSuccess) onSuccess();
          return "Item deleted successfully";
        },
        error: "Failed to delete item",
      });
    }
  };

  const uploadImage = async (file) => {
    if (file) {
      const uploadPromise = (async () => {
        const { uploadImage } = await import("@/lib/supabase");
        const publicUrl = await uploadImage(file);
        if (publicUrl) {
          return publicUrl;
        }
        throw new Error("Upload failed");
      })();

      toast.promise(uploadPromise, {
        loading: "Uploading image...",
        success: "Image uploaded successfully",
        error: "Failed to upload image",
      });

      return uploadPromise;
    }
    return null;
  };

  const saveItem = async (itemData, isEditing) => {
    const actionPromise = (async () => {
      if (isEditing) {
        await DataManager.updateItem(itemData.id, itemData);
        return "Item updated successfully";
      } else {
        await DataManager.addItem(itemData);
        return "Item added successfully";
      }
    })();

    toast.promise(actionPromise, {
      loading: isEditing ? "Updating item..." : "Adding item...",
      success: (data) => {
        if (onSuccess) onSuccess();
        return data;
      },
      error: "Failed to save item",
    });

    return actionPromise;
  };

  const claimItem = async (itemId, claimData) => {
    const claimPromise = (async () => {
      let proofImageUrl = "";
      if (claimData.proofEvidence) {
        const { uploadClaimEvidence } = await import("@/lib/claims");
        proofImageUrl = await uploadClaimEvidence(claimData.proofEvidence);
      }

      await DataManager.updateItemStatus(itemId, false, {
        claimer_name: claimData.claimerName,
        claimer_phone: claimData.claimerPhone,
        claimer_social: claimData.claimerSocial,
        proof_image_url: proofImageUrl,
      });
    })();

    toast.promise(claimPromise, {
      loading: "Processing claim...",
      success: () => {
        if (onSuccess) onSuccess();
        return "Item claimed successfully";
      },
      error: "Failed to claim item",
    });

    return claimPromise;
  };

  const purgeItems = async (days) => {
    const promise = DataManager.purgeItems(days);
    toast.promise(promise, {
      loading: "Purging items...",
      success: (result) => {
        if (result.error) throw new Error(result.error);
        if (onSuccess) onSuccess();
        return `Successfully purged ${result.count} items.`;
      },
      error: (err) => `Error purging items: ${err.message}`,
    });
  };

  return {
    deleteItem,
    uploadImage,
    saveItem,
    claimItem,
    purgeItems,
  };
}
