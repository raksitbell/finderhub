"use client";

import { useState } from "react";
import PublicHeader from "@/components/PublicHeader";
import Footer from "@/components/Footer";
import CategoryFilter from "@/components/CategoryFilter";
import ItemCard from "@/components/ItemCard";
import ItemModal from "@/components/modals/ItemModal";
import FoundItemModal from "@/components/modals/FoundItemModal";
import { useItems } from "@/hooks/useItems";
import { useItemFilter } from "@/hooks/useItemFilter";

/**
 * Home Page Component
 * Displays the main public interface for searching and viewing found items.
 * Uses custom hooks for data fetching and filtering.
 */
export default function Home() {
  const { items, isLoading } = useItems();
  const {
    filteredItems,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useItemFilter(items);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isFoundModalOpen, setIsFoundModalOpen] = useState(false);

  // Calculate stats
  const stats = {
    total: items.length,
    found: items.filter((i) => i.status === true).length,
    returned: items.filter((i) => i.status === false).length,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="container mx-auto px-4 py-8">
        <PublicHeader
          stats={stats}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onFoundItemClick={() => setIsFoundModalOpen(true)}
        />

        <div className="mb-8">{/* CategoryFilter moved to PublicHeader */}</div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-slate-400">Loading items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-400">
              No items found matching your criteria.
            </p>
          </div>
        )}
      </main>

      <Footer />

      <ItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <FoundItemModal
        isOpen={isFoundModalOpen}
        onClose={() => setIsFoundModalOpen(false)}
      />
    </div>
  );
}
