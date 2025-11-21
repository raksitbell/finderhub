"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  X,
  LogOut,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DataManager } from "@/lib/data";

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, found: 0, returned: 0 });
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Forms state
  const [newItem, setNewItem] = useState({
    name: "",
    category: "ทั่วไป",
    date: "",
    location: "",
    description: "",
    contact: "Security Office",
    image: "",
  });
  const [claimData, setClaimData] = useState({
    claimerName: "",
    claimerPhone: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allItems = DataManager.getAllItems();
    setItems(allItems);
    setStats({
      total: allItems.length,
      found: allItems.filter((i) => i.status === "found").length,
      returned: allItems.filter((i) => i.status === "returned").length,
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleResetData = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to reset all data to default?")) {
      DataManager.resetData();
      loadData();
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      DataManager.deleteItem(id);
      loadData();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const itemToAdd = {
      ...newItem,
      image: newItem.image || "https://placehold.co/300x200?text=No+Image",
    };
    DataManager.addItem(itemToAdd);
    loadData();
    setIsAddModalOpen(false);
    setNewItem({
      name: "",
      category: "ทั่วไป",
      date: "",
      location: "",
      description: "",
      contact: "Security Office",
      image: "",
    });
  };

  const handleClaimItem = (e) => {
    e.preventDefault();
    if (selectedItem) {
      DataManager.updateItemStatus(selectedItem.id, "returned", claimData);
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <Shield className="h-6 w-6 text-blue-600" />
            FinderHub Admin
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">
              Back to Home
            </Link>
            <span className="text-sm font-medium text-slate-700">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" /> Logout
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Items</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Found</h3>
            <p className="text-4xl font-bold text-green-600">{stats.found}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Returned</h3>
            <p className="text-4xl font-bold text-slate-600">{stats.returned}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === "found" ? "default" : "secondary"}
                      className={
                        item.status === "found"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-slate-500 hover:bg-slate-600"
                      }
                    >
                      {item.status === "found" ? "Found" : "Returned"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewModal(item)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-slate-500" />
                      </Button>
                      {item.status === "found" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openClaimModal(item)}
                          title="Mark as Returned"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center">
        <button
          onClick={handleResetData}
          className="text-sm text-red-400 hover:text-red-600 flex items-center justify-center gap-1 mx-auto"
        >
          <RotateCcw className="h-3 w-3" /> Reset Data to Default
        </button>
      </footer>

      {/* Add Item Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ทั่วไป">ทั่วไป</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFound">Date & Time Found</Label>
                <Input
                  id="dateFound"
                  type="datetime-local"
                  value={newItem.date}
                  onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location Found</Label>
              <Input
                id="location"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Item Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Point</Label>
              <Input
                id="contact"
                value={newItem.contact}
                onChange={(e) => setNewItem({ ...newItem, contact: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Item Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="relative h-48 w-full bg-slate-100 rounded-lg overflow-hidden">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-500">Name</Label>
                  <p className="font-medium">{selectedItem.name}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Category</Label>
                  <p className="font-medium">{selectedItem.category}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Date Found</Label>
                  <p className="font-medium">
                    {new Date(selectedItem.date).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-slate-500">Location</Label>
                  <p className="font-medium">{selectedItem.location}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Status</Label>
                  <Badge variant={selectedItem.status === "found" ? "default" : "secondary"}>
                    {selectedItem.status === "found" ? "Found" : "Returned"}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-slate-500">Description</Label>
                <p className="text-slate-700">{selectedItem.description}</p>
              </div>
              {selectedItem.status === "returned" && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="font-semibold mb-2">Claimer Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-500">Name</Label>
                      <p className="font-medium">{selectedItem.claimerName || "-"}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Phone</Label>
                      <p className="font-medium">{selectedItem.claimerPhone || "-"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Claim Item Modal */}
      <Dialog open={isClaimModalOpen} onOpenChange={setIsClaimModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Return</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleClaimItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claimerName">Claimer Name</Label>
              <Input
                id="claimerName"
                value={claimData.claimerName}
                onChange={(e) => setClaimData({ ...claimData, claimerName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claimerPhone">Phone Number</Label>
              <Input
                id="claimerPhone"
                value={claimData.claimerPhone}
                onChange={(e) => setClaimData({ ...claimData, claimerPhone: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Confirm Return</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
