import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataManager } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useItemFilters } from "./useItemFilters";
import { useItemActions } from "./useItemActions";

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);

  // Selected Item
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  // Forms
  const [newItem, setNewItem] = useState({
    name: "",
    category: "it_gadget",
    date: "",
    location: "",
    description: "",
    contact: "ห้อง Control Room ชั้น 1",
    contact_detail: "",
    contact_name: "",
    contact_time: "",
    contact_tel: "",
    image: "",
  });

  const [claimData, setClaimData] = useState({
    claimerName: "",
    claimerPhone: "",
    claimerSocial: "",
    proofEvidence: null,
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

  const loadData = async (isBackground = false) => {
    if (isBackground) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    const allItems = await DataManager.getAllItems();
    setInventoryItems(allItems);
    setStats({
      total: allItems.length,
      found: allItems.filter((i) => i.status === true).length,
      returned: allItems.filter((i) => i.status === false).length,
    });

    if (isBackground) {
      setIsRefreshing(false);
    } else {
      setIsLoading(false);
    }
  };

  // --- Hooks ---

  const {
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
  } = useItemFilters(inventoryItems);

  const actions = useItemActions(() => loadData(true));

  // --- Event Handlers ---

  const handleLogout = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsLoading(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDelete = async (id) => {
    await actions.deleteItem(id);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const publicUrl = await actions.uploadImage(file);
      if (publicUrl) {
        setNewItem((prev) => ({ ...prev, image: publicUrl }));
        return publicUrl;
      }
    }
    return null;
  };

  const handleAddItem = async (e, overrideData = {}) => {
    if (e && e.preventDefault) e.preventDefault();

    // Merge newItem with any override data (like the just-uploaded image URL)
    const itemData = { ...newItem, ...overrideData };

    const itemToSave = {
      ...itemData,
      image: itemData.image || "https://placehold.co/300x200?text=No+Image",
      // Only set default status if adding new item, otherwise keep existing or let API handle it
      ...(editingItemId ? {} : { status: true }),
      date: new Date(itemData.date).getTime(),
      ...(editingItemId ? { id: editingItemId } : {}), // Pass ID only if editing
    };

    await actions.saveItem(itemToSave, !!editingItemId);

    setIsAddModalOpen(false);
    setEditingItemId(null); // Reset editing state
    setNewItem({
      name: "",
      category: "it_gadget",
      date: "",
      location: "",
      description: "",
      contact: "ห้อง Control Room ชั้น 1",
      contact_detail: "",
      contact_name: "",
      contact_time: "",
      contact_tel: "",
      image: "",
    });
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);

    // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
    const dateObj = new Date(item.date);
    dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
    const formattedDate = dateObj.toISOString().slice(0, 16);

    setNewItem({
      name: item.name,
      category: item.category,
      date: formattedDate,
      location: item.location,
      description: item.description || "",
      contact: item.contact || "",
      contact_detail: item.contact_detail || "",
      contact_name: item.contact_name || "",
      contact_time: item.contact_time || "",
      contact_tel: item.contact_tel || "",
      image: item.image || "",
    });
    setIsAddModalOpen(true);
    setIsViewModalOpen(false); // Close view modal if open
  };

  const handleClaimItem = async (e) => {
    e.preventDefault();
    if (selectedItem) {
      await actions.claimItem(selectedItem.id, claimData);

      setIsClaimModalOpen(false);
      setIsViewModalOpen(false);
      setClaimData({
        claimerName: "",
        claimerPhone: "",
        claimerSocial: "",
        proofEvidence: null,
      });
    }
  };

  const handlePurge = async (days) => {
    await actions.purgeItems(days);
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const openClaimModal = (item) => {
    setSelectedItem(item);
    setIsClaimModalOpen(true);
  };

  return {
    // State
    userEmail,
    stats,
    isLoading,
    isRefreshing,
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
    isPurgeModalOpen,
    setIsPurgeModalOpen,
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
    handleEditItem,
    editingItemId,
    handleClaimItem,
    handlePurge,
    refreshData: () => loadData(true),
    openViewModal,
    openClaimModal,
    openAddModal: () => {
      setEditingItemId(null);
      setNewItem({
        name: "",
        category: "it_gadget",
        date: "",
        location: "",
        description: "",
        contact: "ห้อง Control Room ชั้น 1",
        contact_detail: "",
        contact_name: "",
        contact_time: "",
        contact_tel: "",
        image: "",
      });
      setIsAddModalOpen(true);
    },
  };
}
