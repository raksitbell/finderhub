/**
 * app.js
 * ------------------------------------------------------------------
 * Controls the Public Home Page.
 * Handles: Fetching items, Displaying items, Search/Filter, and Item Details.
 * ------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DOM Elements
  // ==========================================
  const itemsGrid = document.getElementById("itemsGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const searchBtn = document.getElementById("searchBtn");
  const noResults = document.getElementById("noResults");

  // Modal
  const modal = document.getElementById("itemModal");
  const modalBody = document.getElementById("modalBody");
  const closeModalBtn = document.querySelector(".close-modal");

  // ==========================================
  // 2. Data Fetching
  // ==========================================
  // Only show items that are NOT returned
  let allItems = DataManager.getAllItems().filter(
    (item) => item.status !== "returned"
  );

  // ==========================================
  // 3. Rendering Logic
  // ==========================================

  /**
   * Renders a list of items to the grid.
   * @param {Array} itemsToDisplay - List of items to show.
   */
  const renderItems = (itemsToDisplay) => {
    itemsGrid.innerHTML = "";

    if (itemsToDisplay.length === 0) {
      itemsGrid.classList.add("hidden");
      noResults.classList.remove("hidden");
      return;
    }

    itemsGrid.classList.remove("hidden");
    noResults.classList.add("hidden");

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
                            <span>📍 ${item.location}</span>
                        </div>
                        <div class="card-meta">
                            <span>🏷️ ${item.category}</span>
                        </div>
                        <button onclick="openModal('${item.id}')" class="btn btn-outline btn-block mt-md">View Details</button>
                    </div>
                </div>
            `;
      itemsGrid.innerHTML += cardHTML;
    });
  };

  // ==========================================
  // 4. Search & Filter Logic
  // ==========================================

  const filterItems = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

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
  // 5. Modal Logic
  // ==========================================

  window.openModal = (itemId) => {
    const item = DataManager.getItemById(itemId);
    if (!item) return;

    const isFound = item.status === "found";
    const statusClass = isFound ? "status-found" : "status-returned";
    const statusText = isFound ? "Found" : "Returned";

    modalBody.innerHTML = `
            <img src="${item.image}" alt="${
      item.name
    }" class="card-image" style="height: 300px; margin-bottom: 1rem;">
            <div class="flex justify-between items-center mb-md">
                <h2 style="font-size: 1.5rem; font-weight: 700;">${
                  item.name
                }</h2>
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
                    <p style="font-size: 0.875rem; color: var(--text-secondary);">Note: Please bring your ID card for verification.</p>
                </div>
            `
                : ""
            }
        `;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  // ==========================================
  // 5.1 Found Item Modal Logic
  // ==========================================
  const foundItemBtn = document.getElementById("foundItemBtn");
  const foundItemModal = document.getElementById("foundItemModal");
  const closeFoundModalBtn = document.querySelector(".close-found-modal");

  if (foundItemBtn && foundItemModal) {
    foundItemBtn.addEventListener("click", (e) => {
      e.preventDefault();
      foundItemModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });

    const closeFoundModal = () => {
      foundItemModal.classList.add("hidden");
      document.body.style.overflow = "";
    };

    if (closeFoundModalBtn) {
      closeFoundModalBtn.addEventListener("click", closeFoundModal);
    }

    window.addEventListener("click", (e) => {
      if (e.target === foundItemModal) closeFoundModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !foundItemModal.classList.contains("hidden"))
        closeFoundModal();
    });
  }

  // ==========================================
  // 6. Event Listeners
  // ==========================================
  searchBtn.addEventListener("click", filterItems);
  searchInput.addEventListener("input", filterItems);

  // Category Buttons Logic
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Remove active class from all
      categoryBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked
      btn.classList.add("active");

      // Update hidden select and filter
      const category = btn.dataset.category;
      categoryFilter.value = category;
      filterItems();
    });
  });

  // Keep the select listener just in case
  categoryFilter.addEventListener("change", filterItems);

  // Initial Render
  renderItems(allItems);
});
