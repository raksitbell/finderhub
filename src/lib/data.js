const STORAGE_KEY = "finderhub_items";

export const INITIAL_DATA = [];

export const DataManager = {
  getAllItems: () => {
    if (typeof window === "undefined") return INITIAL_DATA;
    const items = localStorage.getItem(STORAGE_KEY);
    if (!items) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(items);
  },

  getItemById: (id) => {
    const items = DataManager.getAllItems();
    return items.find((item) => item.id === id);
  },

  addItem: (item) => {
    const items = DataManager.getAllItems();
    const newItem = {
      ...item,
      id: Date.now().toString(),
      status: "found",
    };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  },

  updateItemStatus: (id, newStatus, additionalData = {}) => {
    const items = DataManager.getAllItems();
    const item = items.find((i) => i.id === id);
    if (item) {
      item.status = newStatus;
      if (Object.keys(additionalData).length > 0) {
        Object.assign(item, additionalData);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  },

  deleteItem: (id) => {
    let items = DataManager.getAllItems();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  resetData: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  },
};
