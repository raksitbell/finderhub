import { useState, useMemo } from "react";

/**
 * Custom hook to filter items based on category and search query.
 * @param {Array} items - The list of items to filter.
 * @returns {Object} An object containing filtered items and setters for filters.
 */
export function useItemFilter(items) {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter by Status (only show found items for public view)
      // Assuming this hook is used for the public page where we only show 'true' status (Found)
      // If we want to make it generic, we should pass a status filter or handle it outside.
      // For now, let's assume the input 'items' are already filtered by status if needed,
      // OR we explicitly check for status === true here if that's the business rule for the home page.
      // The original code did: const data = allItems.filter((item) => item.status === true);

      const matchesStatus = item.status === true;

      const matchesCategory =
        activeCategory === "" || item.category === activeCategory;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return {
    filteredItems,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  };
}
