export const MESSAGES = {
  DELETE: {
    CONFIRM: "Are you sure you want to delete this item?",
    LOADING: "Deleting item...",
    SUCCESS: "Item deleted successfully",
    ERROR: "Failed to delete item",
  },
  UPLOAD: {
    LOADING: "Uploading image...",
    SUCCESS: "Image uploaded successfully",
    ERROR: "Failed to upload image",
  },
  SAVE: {
    ADDING: "Adding item...",
    UPDATING: "Updating item...",
    ADD_SUCCESS: "Item added successfully",
    UPDATE_SUCCESS: "Item updated successfully",
    ERROR: "Failed to save item",
  },
  CLAIM: {
    LOADING: "Processing claim...",
    SUCCESS: "Item claimed successfully",
    ERROR: "Failed to claim item",
  },
  PURGE: {
    LOADING: "Purging items...",
    SUCCESS: (count) => `Successfully purged ${count} items.`,
    ERROR: (msg) => `Error purging items: ${msg}`,
  },
};
