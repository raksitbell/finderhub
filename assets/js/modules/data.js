/**
 * data.js
 * ------------------------------------------------------------------
 * This file handles all data operations (CRUD: Create, Read, Update, Delete).
 * It uses 'localStorage' to persist data across browser sessions.
 * ------------------------------------------------------------------
 */

// Key used for localStorage
const STORAGE_KEY = "finderhub_items";

// Default data for first-time users
const INITIAL_DATA = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    category: "Electronics",
    location: "Library, 2nd Floor",
    date: "2023-10-25",
    description: "Found on a table near the window. Blue case.",
    image: "https://placehold.co/300x200?text=iPhone+13",
    status: "found",
    contact: "Security Office",
  },
  {
    id: "2",
    name: "Black Wallet",
    category: "Personal",
    location: "Cafeteria",
    date: "2023-10-26",
    description: "Leather wallet containing some cash and cards.",
    image: "https://placehold.co/300x200?text=Wallet",
    status: "found",
    contact: "Lost & Found Counter",
  },
  {
    id: "3",
    name: "Water Bottle",
    category: "Others",
    location: "Gym",
    date: "2023-10-24",
    description: "Green metal water bottle.",
    image: "https://placehold.co/300x200?text=Water+Bottle",
    status: "returned",
    contact: "Gym Reception",
  },
];

// Initialize data if storage is empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
}

/**
 * DataManager Object
 * Contains methods to interact with the data.
 */
export const DataManager = {
  /**
   * Retrieve all items from storage.
   * @returns {Array} List of items.
   */
  getAllItems: () => {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  },

  /**
   * Find a specific item by its ID.
   * @param {string} id - The ID of the item.
   * @returns {Object|undefined} The item object or undefined if not found.
   */
  getItemById: (id) => {
    const items = DataManager.getAllItems();
    return items.find((item) => item.id === id);
  },

  /**
   * Add a new item to storage.
   * @param {Object} item - The item object to add.
   */
  addItem: (item) => {
    const items = DataManager.getAllItems();
    const newItem = {
      ...item,
      id: Date.now().toString(), // Generate unique ID based on timestamp
      status: "found", // Default status
    };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  /**
   * Update the status of an item.
   * @param {string} id - Item ID.
   * @param {string} newStatus - New status ('found' or 'returned').
   * @param {Object} additionalData - Optional data to merge (e.g., claimer info).
   */
  updateItemStatus: (id, newStatus, additionalData = {}) => {
    const items = DataManager.getAllItems();
    const item = items.find((i) => i.id === id);

    if (item) {
      item.status = newStatus;
      // Merge additional data if provided
      if (Object.keys(additionalData).length > 0) {
        Object.assign(item, additionalData);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  },

  /**
   * Delete an item permanently.
   * @param {string} id - Item ID.
   */
  deleteItem: (id) => {
    let items = DataManager.getAllItems();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
};
