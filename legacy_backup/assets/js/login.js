/**
 * login.js
 * ------------------------------------------------------------------
 * Handles the Admin Login Page logic.
 * Responsibilities:
 * - Checking authentication state on load
 * - Handling login form submission
 * - Redirecting to dashboard on success
 * - Displaying error messages on failure
 * ------------------------------------------------------------------
 */

import { AuthManager } from "./modules/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Auth Check
  // ==========================================
  /**
   * If the user is already logged in, redirect them to the admin dashboard immediately.
   */
  if (AuthManager.isLoggedIn()) {
    window.location.href = "admin.html";
    return; // Stop further execution
  }

  // ==========================================
  // 2. DOM Elements
  // ==========================================
  const dom = {
    loginForm: document.getElementById("loginForm"),
    errorMessage: document.getElementById("errorMessage"),
    usernameInput: document.getElementById("username"),
    passwordInput: document.getElementById("password"),
  };

  // ==========================================
  // 3. Event Listeners
  // ==========================================

  if (dom.loginForm) {
    dom.loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission

      // Get input values
      const username = dom.usernameInput.value;
      const password = dom.passwordInput.value;

      // Attempt login
      const isSuccess = AuthManager.login(username, password);

      if (isSuccess) {
        // Success: Redirect to dashboard
        window.location.href = "admin.html";
      } else {
        // Failure: Show error message
        dom.errorMessage.classList.remove("hidden");

        // Optional: Clear password field for better UX
        dom.passwordInput.value = "";
        dom.passwordInput.focus();
      }
    });
  }
});
