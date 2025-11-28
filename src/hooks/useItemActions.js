import { DataManager } from "@/lib/data";
import { toast } from "sonner";
import { MESSAGES } from "@/constants/messages";

/**
 * Custom hook to manage item actions (CRUD, Image Upload, Claims).
 * @param {Function} onSuccess - Callback function to run after a successful action (usually to reload data).
 * @returns {Object} Action functions.
 */
export function useItemActions(onSuccess) {
  const deleteItem = async (id) => {
    if (confirm(MESSAGES.DELETE.CONFIRM)) {
      const promise = DataManager.deleteItem(id);
      toast.promise(promise, {
        loading: MESSAGES.DELETE.LOADING,
        success: () => {
          if (onSuccess) onSuccess();
          return MESSAGES.DELETE.SUCCESS;
        },
        error: MESSAGES.DELETE.ERROR,
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
        loading: MESSAGES.UPLOAD.LOADING,
        success: MESSAGES.UPLOAD.SUCCESS,
        error: MESSAGES.UPLOAD.ERROR,
      });

      return uploadPromise;
    }
    return null;
  };

  const saveItem = async (itemData, isEditing) => {
    const actionPromise = (async () => {
      try {
        if (isEditing) {
          await DataManager.updateItem(itemData.id, itemData);
          return MESSAGES.SAVE.UPDATE_SUCCESS;
        } else {
          await DataManager.addItem(itemData);
          return MESSAGES.SAVE.ADD_SUCCESS;
        }
      } catch (error) {
        // If adding a new item fails and there's an image, delete it to prevent orphans
        if (
          !isEditing &&
          itemData.image &&
          itemData.image.includes("supabase")
        ) {
          console.warn(
            "Item save failed, cleaning up image...",
            itemData.image
          );
          const { deleteImage } = await import("@/lib/supabase");
          await deleteImage(itemData.image);
        }
        throw error; // Re-throw to trigger toast error
      }
    })();

    toast.promise(actionPromise, {
      loading: isEditing ? MESSAGES.SAVE.UPDATING : MESSAGES.SAVE.ADDING,
      success: (data) => {
        if (onSuccess) onSuccess();
        return data;
      },
      error: MESSAGES.SAVE.ERROR,
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
      loading: MESSAGES.CLAIM.LOADING,
      success: () => {
        if (onSuccess) onSuccess();
        return MESSAGES.CLAIM.SUCCESS;
      },
      error: MESSAGES.CLAIM.ERROR,
    });

    return claimPromise;
  };

  const purgeItems = async (days) => {
    const promise = DataManager.purgeItems(days);
    toast.promise(promise, {
      loading: MESSAGES.PURGE.LOADING,
      success: (result) => {
        if (result.error) throw new Error(result.error);
        if (onSuccess) onSuccess();
        return MESSAGES.PURGE.SUCCESS(result.count);
      },
      error: (err) => MESSAGES.PURGE.ERROR(err.message),
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
