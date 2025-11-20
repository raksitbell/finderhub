/**
 * app.js
 * This file controls the User Side (Home Page).
 * It handles fetching items, displaying them, searching, and the Item Detail Modal.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Get HTML elements we need to control
  const itemsGrid = document.getElementById("itemsGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const searchBtn = document.getElementById("searchBtn");
  const noResults = document.getElementById("noResults");

  // Modal Elements
  const modal = document.getElementById("itemModal");
  const modalBody = document.getElementById("modalBody");
  const closeModalBtn = document.querySelector(".close-modal");

  // 1. Get all data from our DataManager
  // Filter out 'returned' items so they don't show up on the home page
  let allItems = DataManager.getAllItems().filter(
    (item) => item.status !== "returned"
  );

  // 2. Function to display items on the screen
  const renderItems = (itemsToDisplay) => {
    // Clear current items
    itemsGrid.innerHTML = "";

    // If no items found, show "No Results" message
    if (itemsToDisplay.length === 0) {
      itemsGrid.classList.add("hidden");
      noResults.classList.remove("hidden");
      return;
    }

    // If items found, show the grid and hide "No Results"
    itemsGrid.classList.remove("hidden");
    noResults.classList.add("hidden");

    // Loop through each item and create a card for it
    itemsToDisplay.forEach((item) => {
      // Determine color and text based on status
      const isFound = item.status === "found";
      const statusClass = isFound ? "status-found" : "status-returned";
      const statusText = isFound ? "Found" : "Returned";

      // Create HTML for the card
      // Note: We changed the button to call openModal() instead of a link
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

      // Add the card to the grid
      itemsGrid.innerHTML += cardHTML;
    });
  };

  // 3. Function to filter items based on Search and Category
  const filterItems = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    // Filter the list
    const filteredItems = allItems.filter((item) => {
      // Check if text matches name, description, or location
      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText);

      // Check if category matches (or if "All Categories" is selected)
      const matchesCategory =
        selectedCategory === "" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Display the filtered list
    renderItems(filteredItems);
  };

  // 4. Modal Functions

  // Open the modal and show item details
  window.openModal = (itemId) => {
    const item = DataManager.getItemById(itemId);
    if (!item) return;

    const isFound = item.status === "found";
    const statusClass = isFound ? "status-found" : "status-returned";
    const statusText = isFound ? "Found" : "Returned";

    // Populate modal content
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

    // Show modal
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Close the modal
  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // Restore scrolling
  };

  // Event Listeners for Modal
  closeModalBtn.addEventListener("click", closeModal);

  // Close if clicked outside the content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // 5. Add Event Listeners for Search
  searchBtn.addEventListener("click", filterItems);
  searchInput.addEventListener("input", filterItems); // Filter while typing
  categoryFilter.addEventListener("change", filterItems); // Filter when category changes

  // 6. Initial Render (Show all items when page loads)
  renderItems(allItems);
});
