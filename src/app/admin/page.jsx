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
  LogOut,
  RefreshCw,
  Filter,
  X,
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
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, found: 0, returned: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Forms state
  const [newItem, setNewItem] = useState({
    name: "",
    category: "it_gadget",
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
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        loadData();
      }
    };
    checkSession();
  }, [router]);

  const loadData = async () => {
    setIsLoading(true);
    const allItems = await DataManager.getAllItems();
    setItems(allItems);
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

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "found"
        ? item.status === true
        : item.status === false;
    
    const matchesCategory =
      filterCategory === "all" ? true : item.category === filterCategory;

    return matchesStatus && matchesCategory;
  }).sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });



  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await DataManager.deleteItem(id);
      loadData();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Ideally, we upload when the user saves the item, but for simplicity/preview
      // we can upload now or just preview.
      // Let's upload now to get the URL.
      const { uploadImage } = await import("@/lib/supabase");
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        setNewItem({ ...newItem, image: publicUrl });
      }
    }
  };

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
      contact: "Security Office",
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

  if (isLoading && items.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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

        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-end gap-2">
            <Button
              variant={showFilters ? "secondary" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={loadData}
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Category</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="it_gadget">โทรศัพท์ / ไอที</SelectItem>
                    <SelectItem value="personal">ของใช้ส่วนตัว</SelectItem>
                    <SelectItem value="stationery">หนังสือ / เครื่องเขียน</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Sort By</Label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFilterStatus("all");
                    setFilterCategory("all");
                    setSortOrder("newest");
                  }}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="h-4 w-4 mr-1" /> Clear Filters
                </Button>
              </div>
            </div>
          )}
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
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-slate-100">
                      <Image
                        src={item.image || "https://placehold.co/300x200?text=No+Image"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.categories?.label || item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-900">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-slate-400">
                        {getRelativeTime(item.date)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === true ? "default" : "secondary"}
                      className={
                        item.status === true
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-slate-500 hover:bg-slate-600"
                      }
                    >
                      {item.status === true ? "Found" : "Returned"}
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
                      {item.status === true && (
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



      {/* Add Item Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
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
                    <SelectItem value="it_gadget">โทรศัพท์ / ไอที</SelectItem>
                    <SelectItem value="personal">ของใช้ส่วนตัว</SelectItem>
                    <SelectItem value="stationery">หนังสือ / เครื่องเขียน</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
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
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="relative h-48 w-full bg-slate-100 rounded-lg overflow-hidden">
                <Image
                  src={selectedItem.image || "https://placehold.co/300x200?text=No+Image"}
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
                  <p className="font-medium">{selectedItem.categories?.label || selectedItem.category}</p>
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
                  <Badge variant={selectedItem.status === true ? "default" : "secondary"}>
                    {selectedItem.status === true ? "Found" : "Returned"}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-slate-500">Description</Label>
                <p className="text-slate-700">{selectedItem.description}</p>
              </div>
              {selectedItem.status === false && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="font-semibold mb-2">Claimer Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-500">Name</Label>
                      <p className="font-medium">{selectedItem.claimer_name || "-"}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Phone</Label>
                      <p className="font-medium">{selectedItem.claimer_phone || "-"}</p>
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
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
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
