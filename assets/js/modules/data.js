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
  {
    id: "4",
    name: "Car Keys (Toyota)",
    category: "Personal",
    location: "Parking Lot B",
    date: "2023-10-27",
    description: "Toyota car keys with a leather keychain.",
    image: "https://placehold.co/300x200?text=Car+Keys",
    status: "found",
    contact: "Security Office",
  },
  {
    id: "5",
    name: "MacBook Air",
    category: "Electronics",
    location: "Study Room 304",
    date: "2023-10-23",
    description: "Silver MacBook Air left on the desk.",
    image: "https://placehold.co/300x200?text=MacBook",
    status: "returned",
    contact: "Admin Office",
  },
  {
    id: "6",
    name: "Blue Umbrella",
    category: "Others",
    location: "Main Entrance",
    date: "2023-10-28",
    description: "Large blue umbrella with a wooden handle.",
    image: "https://placehold.co/300x200?text=Umbrella",
    status: "found",
    contact: "Reception",
  },
  {
    id: "7",
    name: "Calculus Textbook",
    category: "Others",
    location: "Room 401",
    date: "2023-10-22",
    description: "Calculus: Early Transcendentals, 8th Edition.",
    image: "https://placehold.co/300x200?text=Textbook",
    status: "found",
    contact: "Lost & Found Counter",
  },
  {
    id: "8",
    name: "AirPods Pro",
    category: "Electronics",
    location: "Student Lounge",
    date: "2023-10-26",
    description: "AirPods Pro in a white case with a cat sticker.",
    image: "https://placehold.co/300x200?text=AirPods",
    status: "found",
    contact: "Student Affairs",
  },
  {
    id: "9",
    name: "Red Scarf",
    category: "Personal",
    location: "Auditorium",
    date: "2023-10-21",
    description: "Red wool scarf found on seat G12.",
    image: "https://placehold.co/300x200?text=Scarf",
    status: "returned",
    contact: "Lost & Found Counter",
  },
  {
    id: "10",
    name: "Scientific Calculator",
    category: "Electronics",
    location: "Lab 2",
    date: "2023-10-25",
    description: "Casio fx-991EX ClassWiz.",
    image: "https://placehold.co/300x200?text=Calculator",
    status: "found",
    contact: "Lab Technician",
  },
  {
    id: "11",
    name: "Prescription Glasses",
    category: "Personal",
    location: "Library Restroom",
    date: "2023-10-27",
    description: "Black rimmed glasses in a hard case.",
    image: "https://placehold.co/300x200?text=Glasses",
    status: "found",
    contact: "Library Counter",
  },
  {
    id: "12",
    name: "Sports Bag",
    category: "Others",
    location: "Basketball Court",
    date: "2023-10-24",
    description: "Nike sports bag containing gym clothes.",
    image: "https://placehold.co/300x200?text=Sports+Bag",
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
