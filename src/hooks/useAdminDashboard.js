import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataManager } from "@/lib/data";
import { supabase } from "@/lib/supabase";

/**
 * Custom hook to manage the state and logic for the Admin Dashboard.
 * Handles data loading, authentication, filtering, sorting, and modal interactions.
 */
export function useAdminDashboard() {
  const router = useRouter();

  // --- State ---

  // User Session
  const [userEmail, setUserEmail] = useState("");

  // Data & Loading
  const [inventoryItems, setInventoryItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, found: 0, returned: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Sorting
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("date_newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Selected Item
  const [selectedItem, setSelectedItem] = useState(null);

  // Forms
  const [newItem, setNewItem] = useState({
    name: "",
    category: "it_gadget",
    date: "",
    location: "",
    description: "",
    contact: "ห้อง Control Room ชั้น 1",
    image: "",
  });

  const [claimData, setClaimData] = useState({
    claimerName: "",
    claimerPhone: "",
  });

  // --- Effects ---

  useEffect(() => {
    checkSession();
  }, []);

  // --- Functions ---

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

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await DataManager.deleteItem(id);
      loadData();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { uploadImage } = await import("@/lib/supabase");
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        setNewItem({ ...newItem, image: publicUrl });
        return publicUrl;
      }
    }
    return null;
  };

  const handleAddItem = async (e, overrideData = {}) => {
    if (e && e.preventDefault) e.preventDefault();

    // Merge newItem with any override data (like the just-uploaded image URL)
    const itemData = { ...newItem, ...overrideData };

    const itemToAdd = {
      ...itemData,
      image: itemData.image || "https://placehold.co/300x200?text=No+Image",
      status: true,
      date: new Date(itemData.date).getTime(),
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

  const openViewModal = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const openClaimModal = (item) => {
    setSelectedItem(item);
    setIsClaimModalOpen(true);
  };

  // --- Derived State (Filtered Items) ---

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

  return {
    // State
    userEmail,
    stats,
    isLoading,
    filteredItems,
    // Filter State
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
    // Modal State
    isAddModalOpen,
    setIsAddModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isClaimModalOpen,
    setIsClaimModalOpen,
    // Selection & Forms
    selectedItem,
    newItem,
    setNewItem,
    claimData,
    setClaimData,
    // Actions
    handleLogout,
    handleDelete,
    handleImageUpload,
    handleAddItem,
    handleClaimItem,
    openViewModal,
    openClaimModal,
  };
}
