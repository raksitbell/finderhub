/**
 * app.js
 * ------------------------------------------------------------------
 * Controls the Public Home Page logic.
 * Responsibilities:
 * - Fetching and displaying items
 * - Filtering items by search text and category
 * - Handling item detail modals
 * - Handling "Found Item" modal interactions
 * ------------------------------------------------------------------
 */

import { DataManager } from "./modules/data.js";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DOM Elements
  // ==========================================
  const dom = {
    itemsGrid: document.getElementById("itemsGrid"),
    searchInput: document.getElementById("searchInput"),
    categoryFilter: document.getElementById("categoryFilter"),
    searchBtn: document.getElementById("searchBtn"),
    noResults: document.getElementById("noResults"),
    modal: document.getElementById("itemModal"),
    modalBody: document.getElementById("modalBody"),
    closeModalBtn: document.querySelector(".close-modal"),
    foundItemBtn: document.getElementById("foundItemBtn"),
    foundItemModal: document.getElementById("foundItemModal"),
    closeFoundModalBtn: document.querySelector(".close-found-modal"),
    categoryBtns: document.querySelectorAll(".category-btn"),
  };

  // ==========================================
  // 2. Data Initialization
  // ==========================================

  /**
   * Fetch all items and filter out 'returned' items for public view.
   * @type {Array<Object>}
   */
  let allItems = DataManager.getAllItems().filter(
    (item) => item.status !== "returned"
  );

  // ==========================================
  // 3. Rendering Functions
  // ==========================================

  /**
   * Renders a list of items to the grid.
   * @param {Array<Object>} itemsToDisplay - List of items to show.
   */
  const renderItems = (itemsToDisplay) => {
    dom.itemsGrid.innerHTML = "";

    if (itemsToDisplay.length === 0) {
      dom.itemsGrid.classList.add("hidden");
      dom.noResults.classList.remove("hidden");
      return;
    }

    dom.itemsGrid.classList.remove("hidden");
    dom.noResults.classList.add("hidden");

    itemsToDisplay.forEach((item) => {
      const isFound = item.status === "found";
      const statusClass = isFound ? "status-found" : "status-returned";
      const statusText = isFound ? "Found" : "Returned";

      const cardHTML = `
        <div class="card">
            <img src="${item.image}" alt="${item.name}" class="card-image">
            <div class="card-body">
                <div class="card-meta justify-between">
                    <span class="card-badge ${statusClass}">${statusText}</span>
                    <span>${item.date}</span>
                </div>
                <h3 class="card-title">${item.name}</h3>
                <div class="card-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                </div>
                <div class="card-meta">
                    <span><i class="fas fa-tag"></i> ${item.category}</span>
                </div>
                <button onclick="openModal('${item.id}')" class="btn btn-outline btn-block mt-md">View Details</button>
            </div>
        </div>
      `;
      dom.itemsGrid.innerHTML += cardHTML;
    });
  };

  // ==========================================
  // 4. Filter Logic
  // ==========================================

  /**
   * Filters items based on search text and selected category.
   * Re-renders the grid with filtered results.
   */
  const filterItems = () => {
    const searchText = dom.searchInput.value.toLowerCase();
    const selectedCategory = dom.categoryFilter.value;

    const filteredItems = allItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    renderItems(filteredItems);
  };

  // ==========================================
  // 5. Modal Functions
  // ==========================================

  /**
   * Opens the Item Detail Modal.
   * Exposed to global scope for inline onclick handlers.
   * @param {string} itemId - The ID of the item to display.
   */
  window.openModal = (itemId) => {
    const item = DataManager.getItemById(itemId);
    if (!item) return;

    const isFound = item.status === "found";
    const statusClass = isFound ? "status-found" : "status-returned";
    const statusText = isFound ? "Found" : "Returned";

    dom.modalBody.innerHTML = `
        <img src="${item.image}" alt="${
      item.name
    }" class="card-image" style="height: 300px; margin-bottom: 1rem;">
        <div class="flex justify-between items-center mb-md">
            <h2 style="font-size: 1.5rem; font-weight: 700;">${item.name}</h2>
            <span class="card-badge ${statusClass}">${statusText}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-md mb-md">
            <div>
                <p class="text-secondary">Category</p>
                <p class="font-semibold">${item.category}</p>
            </div>
            <div>
                <p class="text-secondary">Date Found</p>
                <p class="font-semibold">${item.date}</p>
            </div>
            <div>
                <p class="text-secondary">Location Found</p>
                <p class="font-semibold">${item.location}</p>
            </div>
            <div>
                <p class="text-secondary">Contact Point</p>
                <p class="font-semibold">${item.contact}</p>
            </div>
        </div>

        <div class="mb-lg">
            <p class="text-secondary mb-sm">Description</p>
            <p>${item.description}</p>
        </div>

        ${
          isFound
            ? `
            <div class="text-center" style="background-color: var(--background-color); padding: 1.5rem; border-radius: var(--radius-md); margin-top: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">Want to claim this item?</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Please visit the <strong>${item.contact}</strong> to claim this item.</p>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">Note: Please bring your ID card for verification.</p>
                <button onclick="closeModal()" class="btn btn-primary" style="min-width: 120px;">OK</button>
            </div>
        `
            : ""
        }
    `;

    dom.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  /**
   * Closes the Item Detail Modal.
   * Exposed to global scope.
   */
  window.closeModal = () => {
    dom.modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  // ==========================================
  // 6. Event Listeners
  // ==========================================

  // Search & Filter
  dom.searchBtn.addEventListener("click", filterItems);
  dom.searchInput.addEventListener("input", filterItems);
  dom.categoryFilter.addEventListener("change", filterItems);

  // Category Buttons
  dom.categoryBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Toggle active state
      dom.categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update hidden select and trigger filter
      const category = btn.dataset.category;
      dom.categoryFilter.value = category;
      filterItems();
    });
  });

  // Item Modal Events
  dom.closeModalBtn.addEventListener("click", window.closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === dom.modal) window.closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dom.modal.classList.contains("hidden"))
      window.closeModal();
  });

  // Found Item Modal Events
  if (dom.foundItemBtn && dom.foundItemModal) {
    const closeFoundModal = () => {
      dom.foundItemModal.classList.add("hidden");
      document.body.style.overflow = "";
    };

    dom.foundItemBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dom.foundItemModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });

    if (dom.closeFoundModalBtn) {
      dom.closeFoundModalBtn.addEventListener("click", closeFoundModal);
    }

    window.addEventListener("click", (e) => {
      if (e.target === dom.foundItemModal) closeFoundModal();
    });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !dom.foundItemModal.classList.contains("hidden")
      )
        closeFoundModal();
    });
  }

  // ==========================================
  // 7. Initial Render
  // ==========================================
  renderItems(allItems);
});
