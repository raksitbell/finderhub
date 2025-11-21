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
