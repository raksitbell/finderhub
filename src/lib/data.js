import { supabase } from "./supabase";

export const DataManager = {
  getAllItems: async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*, categories(label)")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
      return [];
    }
    return data;
  },

  getItemById: async (id) => {
    const { data, error } = await supabase
      .from("items")
      .select("*, categories(label)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching item:", error);
      return null;
    }
    return data;
  },

  addItem: async (item) => {
    const { data, error } = await supabase
      .from("items")
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error("Error adding item:", error);
      return null;
    }
    return data;
  },

  updateItemStatus: async (id, status, claimData = {}) => {
    const updateData = { status, ...claimData };
    const { data, error } = await supabase
      .from("items")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating item:", error);
      return null;
    }
    return data;
  },

  deleteItem: async (id) => {
    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      console.error("Error deleting item:", error);
      return false;
    }
    return true;
  },

  resetData: async () => {
    // Caution: This deletes all data
    // In a real app, you might not want this exposed or implemented this way
    const { error } = await supabase.from("items").delete().neq("id", 0); // Delete all rows

    if (error) {
      console.error("Error resetting data:", error);
      return false;
    }
    return true;
  },
};
