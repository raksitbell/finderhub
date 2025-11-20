/**
 * auth.js
 * This file handles User Login and Logout.
 * It uses 'sessionStorage' to remember if you are logged in.
 * (sessionStorage is cleared when you close the browser tab)
 */

const AUTH_KEY = "finderhub_auth";

// Hardcoded admin username and password
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin1234",
};

const AuthManager = {
  // 1. Check username and password
  login: (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Save login state
      sessionStorage.setItem(AUTH_KEY, "true");
      return true; // Login success
    }
    return false; // Login failed
  },

  // 2. Logout the user
  logout: () => {
    sessionStorage.removeItem(AUTH_KEY);
    // Go back to home page
    // Go back to home page
    if (window.location.pathname.includes("/auth/")) {
      window.location.href = "../index.html";
    } else {
      window.location.href = "index.html";
    }
  },

  // 3. Check if user is currently logged in
  isLoggedIn: () => {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  },

  // 4. Protect admin pages (Redirect if not logged in)
  checkAuth: () => {
    if (!AuthManager.isLoggedIn()) {
      alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาเข้าสู่ระบบ");

      // Check where we are to redirect correctly
      if (window.location.pathname.includes("/auth/")) {
        window.location.href = "login.html"; // If inside /auth/ folder
      } else {
        window.location.href = "auth/login.html"; // If at root
      }
    }
  },
};

// Make AuthManager available to other files
window.AuthManager = AuthManager;
