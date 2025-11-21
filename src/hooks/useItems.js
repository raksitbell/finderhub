import { useState, useEffect } from "react";
import { DataManager } from "@/lib/data";

/**
 * Custom hook to fetch and manage items data.
 * @returns {Object} An object containing items, loading state, and error state.
 */
export function useItems() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const allItems = await DataManager.getAllItems();
        // Filter only active/found items for the public view by default
        // or return all and let the consumer decide.
        // For now, let's return all and let the consumer filter.
        setItems(allItems);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch items:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, isLoading, error, setItems };
}
