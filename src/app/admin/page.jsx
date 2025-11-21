"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataManager } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import AdminStats from "@/components/admin/AdminStats";
import AdminFilters from "@/components/admin/AdminFilters";
import AdminTable from "@/components/admin/AdminTable";
import AddItemModal from "@/components/modals/admin/AddItemModal";
import ViewItemModal from "@/components/modals/admin/ViewItemModal";
import ClaimItemModal from "@/components/modals/admin/ClaimItemModal";

export default function AdminPage() {
  const router = useRouter();
  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, found: 0, returned: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter and Sort state
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
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
  const normalizedSearch = search.trim().toLowerCase();

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

      const matchesSearch =
        normalizedSearch === ""
          ? true
          : [
              item.name,
              item.location,
              item.description,
              item.contact,
              item.category,
            ].some((field) =>
              field ? field.toLowerCase().includes(normalizedSearch) : false
            );

      return matchesStatus && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
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
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src="/images/FinderAdmin.png"
              alt="FinderHub Admin"
              width={150}
              height={40}
              className="h-6 md:h-8 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors p-2 md:p-0 rounded-full hover:bg-slate-100 md:hover:bg-transparent"
              title="Back to Home"
            >
              <Home className="h-5 w-5" />
              <span className="hidden md:inline">Back to Home</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-600">
                {userEmail.split("@")[0]}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors p-2 md:p-0 rounded-full hover:bg-red-50 md:hover:bg-transparent"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Item
          </Button>
        </div>

        <AdminStats stats={stats} />

        <AdminFilters
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onRefresh={loadData}
          isLoading={isLoading}
        />

        <AdminTable
          items={filteredItems}
          onView={openViewModal}
          onClaim={openClaimModal}
          onDelete={handleDelete}
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

      <ViewItemModal
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        selectedItem={selectedItem}
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
