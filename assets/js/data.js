/**
 * data.js
 * This file handles all data operations (Create, Read, Update, Delete).
 * It uses 'localStorage' to save data so it doesn't disappear when you refresh.
 */

// The key used to save our data in the browser's storage
const STORAGE_KEY = "finderhub_items";

// Default data to show when the user visits for the first time
const INITIAL_DATA = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    category: "Electronics",
    location: "Library, 2nd Floor",
    date: "2023-10-25",
    description: "Found on a table near the window. Blue case.",
    image: "https://placehold.co/300x200?text=iPhone+13",
    status: "found", // status can be 'found' or 'returned'
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

// Check if we already have data. If not, save the default data.
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
}

// Object containing all functions to manage data
const DataManager = {
  // 1. Get all items from storage
  getAllItems: () => {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  },

  // 2. Find a specific item by its ID
  getItemById: (id) => {
    const items = DataManager.getAllItems();
    return items.find((item) => item.id === id);
  },

  // 3. Add a new item to storage
  addItem: (item) => {
    const items = DataManager.getAllItems();

    // Create a new item object with a unique ID (using current time)
    const newItem = {
      ...item,
      id: Date.now().toString(),
      status: "found", // Default status is always 'found'
    };

    // Add to the list and save back to storage
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  // 4. Update the status of an item (Found <-> Returned)
  updateItemStatus: (id, newStatus) => {
    const items = DataManager.getAllItems();
    const item = items.find((i) => i.id === id);

    if (item) {
      item.status = newStatus;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  },

  // 5. Delete an item permanently
  deleteItem: (id) => {
    let items = DataManager.getAllItems();
    // Keep only items that DO NOT match the given ID
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
};

// Make DataManager available to other files
window.DataManager = DataManager;
