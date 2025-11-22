"use client";

import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTable from "@/components/admin/AdminTable";
import AddItemModal from "@/components/modals/admin/AddItemModal";
import AdminItemModal from "@/components/modals/admin/AdminItemModal";
import ClaimItemModal from "@/components/modals/admin/ClaimItemModal";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function AdminPage() {
  const {
    userEmail,
    stats,
    isLoading,
    filteredItems,
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
    isAddModalOpen,
    setIsAddModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isClaimModalOpen,
    setIsClaimModalOpen,
    selectedItem,
    newItem,
    setNewItem,
    claimData,
    setClaimData,
    handleLogout,
    handleDelete,
    handleImageUpload,
    handleAddItem,
    handleClaimItem,
    openViewModal,
    openClaimModal,
  } = useAdminDashboard();

  if (isLoading) {
    return <LoadingScreen />;
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
        onEdit={(item) => console.log("Edit item:", item)}
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
