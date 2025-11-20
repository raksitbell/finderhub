import { AuthManager } from "./modules/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. If already logged in, go straight to dashboard
  if (AuthManager.isLoggedIn()) {
    window.location.href = "admin.html";
  }

  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  // 2. Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Stop reload

      // Get inputs
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Check credentials
      if (AuthManager.login(username, password)) {
        // Success: Go to dashboard
        window.location.href = "admin.html";
      } else {
        // Fail: Show error message
        errorMessage.classList.remove("hidden");
      }
    });
  }
});
