# Refactor Codebase, UI Migration & Documentation

## 📝 Description

This PR represents a significant update to the FinderHub project. It includes a migration to **Preline UI** for enhanced styling capabilities, a comprehensive **refactor of the Admin Dashboard** logic into custom hooks, and the addition of detailed **developer documentation** and a **Thai README**.

## 🚀 Key Changes

### 🎨 UI & Styling

- **Preline UI Integration**: Installed and configured Preline UI (Tailwind CSS component library) to standardize UI elements and improve responsiveness.
- **Tailwind Configuration**: Updated `tailwind.config.js` to support Preline plugins and content paths.

### ♻️ Refactoring

- **`useAdminDashboard` Hook**: Extracted all state management and logic from `src/app/admin/page.jsx` into a new custom hook `src/hooks/useAdminDashboard.js`. This reduces the complexity of the page component and improves readability.
- **Component Cleanup**: Refactored `AdminPage` to use the new hook, resulting in cleaner and more maintainable code.

### 📚 Documentation

- **Development Guide**: Created `docs/DEVELOPMENT.md` providing a deep dive into the project structure, key components, state management, and data flow.
- **Thai README**: Added `README.th.md` to support Thai-speaking developers/users.
- **Updated README**: Enhanced the main `README.md` with updated project structure and links to documentation.

### ✨ Previous Enhancements (Included)

- **Add Item Wizard**: 2-step process (Form -> Preview) for adding items.
- **Component Extraction**: `AddItemForm`, `AddItemPreview`, `ClaimerInfoCard`, `KeyMetrics`.
- **Bug Fixes**: Fixed filename display and missing icons in `ItemCard`.

## ✅ Verification

- [x] **Build Check**: Verified that the project builds successfully with the new Preline integration.
- [x] **Admin Functionality**: Tested all admin actions (Add, View, Claim, Delete) using the refactored hook logic.
- [x] **Documentation**: Reviewed `docs/DEVELOPMENT.md` and `README.th.md` for accuracy.
- [x] **UI Responsiveness**: Confirmed that the UI remains responsive and visually consistent.
