"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFilter from "@/components/CategoryFilter";
import ItemCard from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import FoundItemModal from "@/components/FoundItemModal";
import { DataManager } from "@/lib/data";

export default function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFoundModalOpen, setIsFoundModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await DataManager.getAllItems();
      const data = allItems.filter((item) => item.status !== "returned");
      setItems(data);
      setFilteredItems(data);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesCategory =
        activeCategory === "" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredItems(filtered);
  }, [activeCategory, searchQuery, items]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar
        onFoundItemClick={() => setIsFoundModalOpen(true)}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-8 flex-1">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {filteredItems.length > 0 ? (
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
