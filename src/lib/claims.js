import { supabase } from "./supabase";
import { convertImageToWebP } from "./imageConverter";

/**
 * Uploads claim evidence image to Supabase storage.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string|null>} The public URL of the uploaded image or null if failed.
 */
export const uploadClaimEvidence = async (file) => {
  try {
    // Convert to WebP
    const webpFile = await convertImageToWebP(file);

    const fileName = `${crypto.randomUUID()}.webp`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("claim-evidence")
      .upload(filePath, webpFile);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("claim-evidence")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading claim evidence:", error);
    return null;
  }
};
