/**
 * auth.js
 * ------------------------------------------------------------------
 * Handles User Authentication (Login/Logout).
 * Uses 'sessionStorage' to maintain session state.
 * ------------------------------------------------------------------
 */

const AUTH_KEY = "finderhub_auth";

// Mock Credentials (In a real app, this would be on a server)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin1234",
};

export const AuthManager = {
  /**
   * Attempts to log in the user.
   * @param {string} username
   * @param {string} password
   * @returns {boolean} True if successful, false otherwise.
   */
  login: (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  /**
   * Logs out the user and redirects to home.
   */
  logout: () => {
    sessionStorage.removeItem(AUTH_KEY);
    // Redirect logic based on current path
    const isAuthFolder = window.location.pathname.includes("/auth/");
    window.location.href = isAuthFolder ? "../index.html" : "index.html";
  },

  /**
   * Checks if the user is currently authenticated.
   * @returns {boolean}
   */
  isLoggedIn: () => {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  },

  /**
   * Protects admin pages. Redirects to login if not authenticated.
   */
  checkAuth: () => {
    if (!AuthManager.isLoggedIn()) {
      alert("Access Denied. Please log in.");
      const isAuthFolder = window.location.pathname.includes("/auth/");
      window.location.href = isAuthFolder ? "login.html" : "auth/login.html";
    }
  },
};
