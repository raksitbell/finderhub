import { useState, useMemo } from "react";

/**
 * Custom hook to manage filtering and sorting of items.
 * @param {Array} items - The list of items to filter and sort.
 * @returns {Object} Filter states, setters, and the filtered list of items.
 */
export function useItemFilters(items) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("date_newest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesStatus =
          filterStatus === "all"
            ? true
            : filterStatus === "found"
            ? item.status === true
            : item.status === false;

        const matchesCategory =
          filterCategory === "all" ? true : item.category === filterCategory;

        const matchesLocation =
          filterLocation === "" ||
          item.location.toLowerCase().includes(filterLocation.toLowerCase());

        const matchesSearch =
          searchQuery === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.categories?.label || item.category)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return (
          matchesStatus && matchesCategory && matchesLocation && matchesSearch
        );
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "category_asc":
            return (a.categories?.label || a.category).localeCompare(
              b.categories?.label || b.category
            );
          case "category_desc":
            return (b.categories?.label || b.category).localeCompare(
              a.categories?.label || a.category
            );
          case "date_newest":
            return new Date(b.date) - new Date(a.date);
          case "date_oldest":
            return new Date(a.date) - new Date(b.date);
          case "status_found":
            return a.status === b.status ? 0 : a.status ? -1 : 1;
          case "status_returned":
            return a.status === b.status ? 0 : a.status ? 1 : -1;
          default:
            return new Date(b.date) - new Date(a.date);
        }
      });
  }, [
    items,
    filterStatus,
    filterCategory,
    filterLocation,
    sortOrder,
    searchQuery,
  ]);

  return {
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    filterLocation,
    setFilterLocation,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
}
