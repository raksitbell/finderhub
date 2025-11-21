import { supabase } from "./supabase";

/**
 * DataManager handles all database interactions for items.
 */
export const DataManager = {
  /**
   * Fetches all items from the database, ordered by date (newest first).
   * @returns {Promise<Array>} A promise that resolves to an array of items.
   */
  getAllItems: async () => {
    const { data: items, error } = await supabase
      .from("items")
      .select("*, categories(label)")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
      return [];
    }
    return items;
  },

  /**
   * Fetches a single item by its ID.
   * @param {string|number} id - The ID of the item to fetch.
   * @returns {Promise<Object|null>} A promise that resolves to the item object or null if failed.
   */
  getItemById: async (id) => {
    const { data: item, error } = await supabase
      .from("items")
      .select("*, categories(label)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching item:", error);
      return null;
    }
    return item;
  },

  /**
   * Adds a new item to the database.
   * @param {Object} itemData - The item data to insert.
   * @returns {Promise<Object|null>} A promise that resolves to the inserted item or null if failed.
   */
  addItem: async (itemData) => {
    const { data: newItem, error } = await supabase
      .from("items")
      .insert([itemData])
      .select()
      .single();

    if (error) {
      console.error("Error adding item:", error);
      return null;
    }
    return newItem;
  },

  /**
   * Updates the status of an item (e.g., marking it as returned).
   * @param {string|number} id - The ID of the item to update.
   * @param {boolean} status - The new status (true for Found, false for Returned).
   * @param {Object} [claimData={}] - Optional claimer information.
   * @returns {Promise<Object|null>} A promise that resolves to the updated item or null if failed.
   */
  updateItemStatus: async (id, status, claimData = {}) => {
    const updatePayload = { status, ...claimData };
    const { data: updatedItem, error } = await supabase
      .from("items")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating item:", error);
      return null;
    }
    return updatedItem;
  },

  /**
   * Deletes an item from the database.
   * @param {string|number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
   */
  deleteItem: async (id) => {
    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      console.error("Error deleting item:", error);
      return false;
    }
    return true;
  },
};
