/**
 * admin.js
 * ------------------------------------------------------------------
 * Controls the Admin Dashboard functionality.
 * Handles: Authentication check, Listing items, Status updates, Deletions, and Modals.
 * ------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Initialization & Auth Check
  // ==========================================
  AuthManager.checkAuth();

  // ==========================================
  // 2. DOM Elements
  // ==========================================
  const tableBody = document.getElementById("adminItemsTable");
  const totalItemsEl = document.getElementById("totalItems");
  const foundItemsEl = document.getElementById("foundItems");
  const returnedItemsEl = document.getElementById("returnedItems");

  // Modals
  const addModal = document.getElementById("addItemModal");
  const claimModal = document.getElementById("claimItemModal");
  const viewModal = document.getElementById("viewItemModal");

  // Forms
  const addForm = document.getElementById("addItemForm");
  const claimForm = document.getElementById("claimItemForm");

  // ==========================================
  // 3. Dashboard Rendering
  // ==========================================

  /**
   * Renders the dashboard statistics and the items table.
   */
  const renderDashboard = () => {
    const items = DataManager.getAllItems();

    // Update Stats
    totalItemsEl.textContent = items.length;
    foundItemsEl.textContent = items.filter((i) => i.status === "found").length;
    returnedItemsEl.textContent = items.filter(
      (i) => i.status === "returned"
    ).length;

    // Clear Table
    tableBody.innerHTML = "";

    // Render Table Rows
    items.forEach((item) => {
      const tr = document.createElement("tr");
      const isFound = item.status === "found";

      // Status Badge
      const statusBadge = isFound
        ? '<span class="card-badge status-found">Found</span>'
        : '<span class="card-badge status-returned">Returned</span>';

      // Action Button (Checkmark or Refresh)
      const toggleAction = isFound
        ? `<button class="action-btn" onclick="updateStatus('${item.id}', 'returned')" title="Mark as Returned">✅</button>`
        : `<button class="action-btn" onclick="updateStatus('${item.id}', 'found')" title="Mark as Found">🔄</button>`;

      tr.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td style="font-weight: 500;">${item.name}</td>
                <td>${item.category}</td>
                <td>${item.location}</td>
                <td>${item.date}</td>
                <td>${statusBadge}</td>
                <td>
                    ${toggleAction}
                    <button class="action-btn view" onclick="viewItem('${item.id}')" title="View Details">👁️</button>
                    <button class="action-btn delete" onclick="deleteItem('${item.id}')" title="Delete Item">🗑️</button>
                </td>
            `;
      tableBody.appendChild(tr);
    });
  };

  // ==========================================
  // 4. Global Actions (Exposed to Window)
  // ==========================================

  let currentItemIdToReturn = null;

  /**
   * Updates the status of an item.
   * If status is 'returned', opens the claim modal first.
   */
  window.updateStatus = (id, status) => {
    if (status === "returned") {
      currentItemIdToReturn = id;
      claimModal.classList.remove("hidden");
      claimForm.reset();
    } else {
      if (confirm(`Change status to ${status}?`)) {
        DataManager.updateItemStatus(id, status);
        renderDashboard();
      }
    }
  };

  /**
   * Deletes an item after confirmation.
   */
  window.deleteItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      DataManager.deleteItem(id);
      renderDashboard();
    }
  };

  /**
   * Opens the View Item Modal with details.
   */
  window.viewItem = (id) => {
    const item = DataManager.getItemById(id);
    if (!item) return;

    // Populate Fields
    document.getElementById("viewItemImage").src = item.image;
    document.getElementById("viewItemName").textContent = item.name;
    document.getElementById("viewItemCategory").textContent = item.category;
    document.getElementById("viewItemDate").textContent = item.date;
    document.getElementById("viewItemLocation").textContent = item.location;
    document.getElementById("viewItemStatus").textContent = item.status;
    document.getElementById("viewItemContact").textContent = item.contact;
    document.getElementById("viewItemDescription").textContent =
      item.description;

    // Show/Hide Claimer Info
    const claimerSection = document.getElementById("viewItemClaimerSection");
    if (item.status === "returned" && item.claimerName) {
      claimerSection.classList.remove("hidden");
      document.getElementById("viewItemClaimerName").textContent =
        item.claimerName;
      document.getElementById("viewItemClaimerPhone").textContent =
        item.claimerPhone;
    } else {
      claimerSection.classList.add("hidden");
    }

    viewModal.classList.remove("hidden");
  };

  // ==========================================
  // 5. Event Listeners
  // ==========================================

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    AuthManager.logout();
  });

  // Reset Data
  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Reset all data to default? This cannot be undone.")) {
        localStorage.removeItem("finderhub_items");
        alert("Data reset.");
        window.location.reload();
      }
    });
  }

  // --- Add Item Modal ---
  const openAddBtn = document.getElementById("openAddItemModalBtn");
  if (openAddBtn) {
    openAddBtn.addEventListener("click", () => {
      addModal.classList.remove("hidden");
      document.getElementById("dateFound").value = new Date()
        .toISOString()
        .split("T")[0];
    });
  }

  if (addForm) {
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById("imageUpload");
      let imageSrc = "https://placehold.co/300x200?text=No+Image";

      // Handle Image
      if (fileInput.files && fileInput.files[0]) {
        try {
          imageSrc = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(fileInput.files[0]);
          });
        } catch (error) {
          alert("Failed to read image.");
        }
      }

      const newItem = {
        name: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        date: document.getElementById("dateFound").value,
        location: document.getElementById("location").value,
        image: imageSrc,
        description: document.getElementById("description").value,
        contact: document.getElementById("contact").value,
      };

      try {
        DataManager.addItem(newItem);
        alert("Item added successfully!");
        addModal.classList.add("hidden");
        addForm.reset();
        renderDashboard();
      } catch (error) {
        alert("Error: Image too large for storage.");
      }
    });
  }

  // --- Claim Modal ---
  if (claimForm) {
    claimForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const claimerName = document.getElementById("claimerName").value;
      const claimerPhone = document.getElementById("claimerPhone").value;

      if (currentItemIdToReturn) {
        DataManager.updateItemStatus(currentItemIdToReturn, "returned", {
          claimerName,
          claimerPhone,
        });
        alert("Item marked as returned!");
        claimModal.classList.add("hidden");
        currentItemIdToReturn = null;
        renderDashboard();
      }
    });
  }

  // --- Close Modals (Generic) ---
  const closeButtons = document.querySelectorAll(
    ".close-modal, #cancelClaimBtn"
  );
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      addModal.classList.add("hidden");
      claimModal.classList.add("hidden");
      viewModal.classList.add("hidden");
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target === addModal) addModal.classList.add("hidden");
    if (e.target === claimModal) claimModal.classList.add("hidden");
    if (e.target === viewModal) viewModal.classList.add("hidden");
  });

  // Initial Render
  renderDashboard();
});
