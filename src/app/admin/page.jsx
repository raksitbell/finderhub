"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataManager } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTable from "@/components/admin/AdminTable";
import AddItemModal from "@/components/modals/admin/AddItemModal";
import AdminItemModal from "@/components/modals/admin/AdminItemModal";
import ClaimItemModal from "@/components/modals/admin/ClaimItemModal";

export default function AdminPage() {
  const router = useRouter();
  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, found: 0, returned: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filter and Sort state
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("date_newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // User session state
  const [userEmail, setUserEmail] = useState("");

  // Modal visibility state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Selected item for view/claim actions
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state for new item
  const [newItem, setNewItem] = useState({
    name: "",
    category: "it_gadget",
    date: "",
    location: "",
    description: "",
    contact: "ห้อง Control Room ชั้น 1",
    image: "",
  });

  // Form state for claiming item
  const [claimData, setClaimData] = useState({
    claimerName: "",
    claimerPhone: "",
  });

  /**
   * Checks for an active user session on component mount.
   * Redirects to login if no session exists.
   */
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUserEmail(session.user.email);
        loadData();
      }
    };
    checkSession();
  }, [router]);

  /**
   * Fetches all items from the database and updates state.
   * Calculates statistics based on the fetched data.
   */
  const loadData = async () => {
    setIsLoading(true);
    const allItems = await DataManager.getAllItems();
    setInventoryItems(allItems);
    setStats({
      total: allItems.length,
      found: allItems.filter((i) => i.status === true).length,
      returned: allItems.filter((i) => i.status === false).length,
    });
    setIsLoading(false);
  };

  /**
   * Handles user logout.
   * Signs out from Supabase and redirects to the home page.
   */
  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/");
  };

  /**
   * Filters and sorts the inventory items based on current state.
   * @returns {Array} Filtered and sorted items.
   */
  const filteredItems = inventoryItems
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

  /**
   * Deletes an item by its ID after user confirmation.
   * @param {string} id - The ID of the item to delete.
   */
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await DataManager.deleteItem(id);
      loadData();
    }
  };

  /**
   * Handles image file upload.
   * Uploads the file to Supabase Storage and updates the newItem state with the public URL.
   * @param {Event} e - The change event from the file input.
   */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { uploadImage } = await import("@/lib/supabase");
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        setNewItem({ ...newItem, image: publicUrl });
      }
    }
  };

  /**
   * Submits the new item form.
   * Adds the item to the database and refreshes the list.
   * @param {Event} e - The form submission event.
   */
  const handleAddItem = async (e) => {
    e.preventDefault();
    const itemToAdd = {
      ...newItem,
      image: newItem.image || "https://placehold.co/300x200?text=No+Image",
      status: true,
      date: new Date(newItem.date).getTime(), // Convert to Unix timestamp
    };
    await DataManager.addItem(itemToAdd);
    loadData();
    setIsAddModalOpen(false);
    setNewItem({
      name: "",
      category: "it_gadget",
      date: "",
      location: "",
      description: "",
      contact: "ห้อง Control Room ชั้น 1",
      image: "",
    });
  };

  /**
   * Marks an item as returned (claimed).
   * Updates the item status and records claimer details.
   * @param {Event} e - The form submission event.
   */
  const handleClaimItem = async (e) => {
    e.preventDefault();
    if (selectedItem) {
      await DataManager.updateItemStatus(selectedItem.id, false, {
        claimer_name: claimData.claimerName,
        claimer_phone: claimData.claimerPhone,
      });
      loadData();
      setIsClaimModalOpen(false);
      setClaimData({ claimerName: "", claimerPhone: "" });
    }
  };

  /**
   * Opens the View Item modal.
   * @param {Object} item - The item to view.
   */
  const openViewModal = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  /**
   * Opens the Claim Item modal.
   * @param {Object} item - The item to claim.
   */
  const openClaimModal = (item) => {
    setSelectedItem(item);
    setIsClaimModalOpen(true);
  };

  if (isLoading && inventoryItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <main className="container mx-auto px-4 py-8">
        <AdminHeader
          stats={stats}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        <AdminTable
          items={filteredItems}
          onView={openViewModal}
          onAddItem={() => setIsAddModalOpen(true)}
          filterProps={{
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
          }}
        />
      </main>

      <AddItemModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        newItem={newItem}
        setNewItem={setNewItem}
        onAddItem={handleAddItem}
        onImageUpload={handleImageUpload}
      />

      <AdminItemModal
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        item={selectedItem}
        onClaim={openClaimModal}
        onDelete={handleDelete}
        onEdit={(item) => {
          // Placeholder for edit functionality
          console.log("Edit item:", item);
          // You might want to open the AddItemModal with pre-filled data here
          // For now, we'll just log it
        }}
      />

      <ClaimItemModal
        isOpen={isClaimModalOpen}
        onOpenChange={setIsClaimModalOpen}
        claimData={claimData}
        setClaimData={setClaimData}
        onClaimItem={handleClaimItem}
      />
    </div>
  );
}
