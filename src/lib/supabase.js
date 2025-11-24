import { createBrowserClient } from "@supabase/ssr";
import { convertImageToWebP } from "./imageConverter";

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

export const supabase = createBrowserClient(urlToUse, keyToUse);

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
