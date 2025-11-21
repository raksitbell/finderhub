import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const urlToUse = isValidUrl(supabaseUrl)
  ? supabaseUrl
  : "https://placeholder.supabase.co";
const keyToUse = supabaseAnonKey || "placeholder-key";

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables are missing or invalid. Using placeholder values."
  );
}

export const supabase = createClient(urlToUse, keyToUse);

const convertImageToWebP = async (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const newFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, "") + ".webp",
              {
                type: "image/webp",
              }
            );
            resolve(newFile);
          } else {
            reject(new Error("Canvas to Blob failed"));
          }
        },
        "image/webp",
        0.8
      );
    };
    img.onerror = (error) => reject(error);
    img.src = URL.createObjectURL(file);
  });
};

export const uploadImage = async (file) => {
  try {
    // Convert to WebP
    const webpFile = await convertImageToWebP(file);

    const fileName = `${crypto.randomUUID()}.webp`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("item-images")
      .upload(filePath, webpFile);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("item-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
