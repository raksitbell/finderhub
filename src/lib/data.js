/**
 * DataManager handles all database interactions for items via API routes.
 */
export const DataManager = {
  /**
   * Fetches all items from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of items.
   */
  getAllItems: async () => {
    try {
      const response = await fetch("/api/items");
      if (!response.ok) throw new Error("Failed to fetch items");
      return await response.json();
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  },

  /**
   * Fetches a single item by its ID.
   * @param {string|number} id - The ID of the item to fetch.
   * @returns {Promise<Object|null>} A promise that resolves to the item object or null if failed.
   */
  getItemById: async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`);
      if (!response.ok) throw new Error("Failed to fetch item");
      return await response.json();
    } catch (error) {
      console.error("Error fetching item:", error);
      return null;
    }
  },

  /**
   * Adds a new item to the database.
   * @param {Object} itemData - The item data to insert.
   * @returns {Promise<Object|null>} A promise that resolves to the inserted item or null if failed.
   */
  addItem: async (itemData) => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
      if (!response.ok) throw new Error("Failed to add item");
      return await response.json();
    } catch (error) {
      console.error("Error adding item:", error);
      return null;
    }
  },

  /**
   * Updates the status of an item (e.g., marking it as returned).
   * @param {string|number} id - The ID of the item to update.
   * @param {boolean} status - The new status (true for Found, false for Returned).
   * @param {Object} [claimData={}] - Optional claimer information.
   * @returns {Promise<Object|null>} A promise that resolves to the updated item or null if failed.
   */
  updateItemStatus: async (id, status, claimData = {}) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, ...claimData }),
      });
      if (!response.ok) throw new Error("Failed to update item");
      return await response.json();
    } catch (error) {
      console.error("Error updating item:", error);
      return null;
    }
  },

  /**
   * Deletes an item from the database.
   * @param {string|number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
   */
  deleteItem: async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      return false;
    }
  },

  /**
   * Purges items that are found and older than the specified number of days.
   * @param {number} days - The number of days threshold.
   * @returns {Promise<Object>} The result of the purge operation.
   */
  purgeItems: async (days) => {
    try {
      const response = await fetch("/api/items/purge", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ days }),
      });
      if (!response.ok) throw new Error("Failed to purge items");
      return await response.json();
    } catch (error) {
      console.error("Error purging items:", error);
      return { error: error.message };
    }
  },
};
