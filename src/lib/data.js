/**
 * DataManager handles all database interactions for items via API routes.
 */
export const DataManager = {
  /**
   * Fetches all items from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of items.
   */
  getAllItems: async () => {
    const response = await fetch("/api/items");
    if (!response.ok) throw new Error("Failed to fetch items");
    return await response.json();
  },

  /**
   * Fetches a single item by its ID.
   * @param {string|number} id - The ID of the item to fetch.
   * @returns {Promise<Object>} A promise that resolves to the item object.
   */
  getItemById: async (id) => {
    const response = await fetch(`/api/items/${id}`);
    if (!response.ok) throw new Error("Failed to fetch item");
    return await response.json();
  },

  /**
   * Adds a new item to the database.
   * @param {Object} itemData - The item data to insert.
   * @returns {Promise<Object>} A promise that resolves to the inserted item.
   */
  addItem: async (itemData) => {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to add item");
    }
    return await response.json();
  },

  /**
   * Updates an existing item in the database.
   * @param {string|number} id - The ID of the item to update.
   * @param {Object} itemData - The updated item data.
   * @returns {Promise<Object>} A promise that resolves to the updated item.
   */
  updateItem: async (id, itemData) => {
    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to update item");
    }
    return await response.json();
  },

  /**
   * Updates the status of an item (e.g., marking it as returned).
   * @param {string|number} id - The ID of the item to update.
   * @param {boolean} status - The new status (true for Found, false for Returned).
   * @param {Object} [claimData={}] - Optional claimer information.
   * @returns {Promise<Object>} A promise that resolves to the updated item.
   */
  updateItemStatus: async (id, status, claimData = {}) => {
    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, ...claimData }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to update item");
    }
    return await response.json();
  },

  /**
   * Deletes an item from the database.
   * @param {string|number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if successful.
   */
  deleteItem: async (id) => {
    const response = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete item");
    }
    return true;
  },

  /**
   * Purges items that are found and older than the specified number of days.
   * @param {number} days - The number of days threshold.
   * @returns {Promise<Object>} The result of the purge operation.
   */
  purgeItems: async (days) => {
    const response = await fetch("/api/items/purge", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ days }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to purge items");
    }
    return await response.json();
  },
};
