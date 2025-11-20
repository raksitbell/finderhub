/**
 * admin.js
 * This file controls the Admin Dashboard.
 * It handles listing items, updating status, and deleting items.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Security Check: Ensure user is logged in
  AuthManager.checkAuth();

  // 2. Handle Logout Button
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    AuthManager.logout();
  });

  // 3. Handle Reset Data Button
  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        confirm(
          "Are you sure you want to reset all data to default? This cannot be undone."
        )
      ) {
        localStorage.removeItem("finderhub_items"); // Clear data
        alert("Data has been reset to default.");
        window.location.reload(); // Reload page to re-initialize default data
      }
    });
  }

  // Elements to update
  const tableBody = document.getElementById("adminItemsTable");
  const totalItemsEl = document.getElementById("totalItems");
  const foundItemsEl = document.getElementById("foundItems");
  const returnedItemsEl = document.getElementById("returnedItems");

  // 4. Function to Draw the Dashboard
  const renderDashboard = () => {
    const items = DataManager.getAllItems();

    // Update the numbers at the top
    totalItemsEl.textContent = items.length;
    foundItemsEl.textContent = items.filter((i) => i.status === "found").length;
    returnedItemsEl.textContent = items.filter(
      (i) => i.status === "returned"
    ).length;

    // Clear the table
    tableBody.innerHTML = "";

    // Loop through items and add rows to the table
    items.forEach((item) => {
      const tr = document.createElement("tr");

      // Determine status badge style
      const isFound = item.status === "found";
      const statusBadge = isFound
        ? '<span class="card-badge status-found">Found</span>'
        : '<span class="card-badge status-returned">Returned</span>';

      // Determine action button (Checkmark or Refresh icon)
      const toggleAction = isFound
        ? `<button class="action-btn" onclick="updateStatus('${item.id}', 'returned')" title="Mark as Returned">✅</button>`
        : `<button class="action-btn" onclick="updateStatus('${item.id}', 'found')" title="Mark as Found">🔄</button>`;

      // Create HTML for the row
      tr.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td style="font-weight: 500;">${item.name}</td>
                <td>${item.category}</td>
                <td>${item.location}</td>
                <td>${item.date}</td>
                <td>${statusBadge}</td>
                <td>
                    ${toggleAction}
                    <button class="action-btn delete" onclick="deleteItem('${item.id}')" title="Delete Item">🗑️</button>
                </td>
            `;
      tableBody.appendChild(tr);
    });
  };

  // 5. Global Functions for Buttons (Update Status & Delete)
  // We attach these to 'window' so they can be called from the HTML onclick=""

  window.updateStatus = (id, status) => {
    if (confirm(`Change status to ${status}?`)) {
      DataManager.updateItemStatus(id, status);
      renderDashboard(); // Re-draw table to show changes
    }
  };

  window.deleteItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      DataManager.deleteItem(id);
      renderDashboard(); // Re-draw table to show changes
    }
  };

  // Initial Draw
  renderDashboard();
});
