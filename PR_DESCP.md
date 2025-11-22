# 📦 Patch Notes: FinderHub Overhaul

## 📅 Date: 2025-11-22

## 🔄 Version: 2.0.0 (Refactor & Enhancement)

This patch introduces a major overhaul to the FinderHub application, focusing on UI modernization, code maintainability, developer experience, and comprehensive documentation.

---

### ✨ New Features

#### 🎨 UI & Design System

- **Preline UI Integration**: Fully integrated Preline UI for modern, accessible components.
- **Font Standardization**: Switched the entire application to use **"Noto Sans Thai"** as the primary font, replacing Inter and Kanit.
- **Responsive Design**: Enhanced mobile views for the Admin Dashboard and Public Grid.

#### ⏳ Loading Experience

- **Global Loading Screen**: Added a branded, full-screen loader (`LoadingScreen.jsx`) for the Admin Dashboard.
- **Skeleton Screens**: Implemented `ItemCardSkeleton` to prevent layout shift on the public page.
- **Image Optimization**: Added smart loading states to `ItemCard` with pulse animations while images load.

#### 🛠️ Admin Dashboard Enhancements

- **Add Item Wizard**: Transformed the "Add Item" modal into a 2-step wizard (Form -> Live Preview).
- **Live Preview**: Admins can now see exactly how an item card will look before publishing.
- **Key Metrics**: Added a reusable `KeyMetrics` component for consistent stat display across Public and Admin views.

---

### 🧑‍💻 Developer Experience (DX)

- **Automated Environment Setup**:
  - Added `scripts/supabase-init.js`.
  - **Behavior**: Automatically checks for a `.env` file when running `npm run dev`. If missing, it interactively prompts for Supabase credentials and creates the file.
- **Code Refactoring**:
  - **`useAdminDashboard` Hook**: Extracted 250+ lines of logic from `AdminPage` into a custom hook for better separation of concerns.
  - **Component Modularization**: Broke down monolithic components into smaller pieces (`AddItemForm`, `AddItemPreview`, `ClaimerInfoCard`).

---

### 📚 Documentation Updates

- **New Documentation**:
  - `docs/DEVELOPMENT.md`: A deep dive into the codebase structure, state management, and component architecture.
  - `guidelines.md`: A complete presentation guide including a demo script, target audience, and tech stack overview.
- **README Overhaul**:
  - **Thai Default**: Set Thai (`README.md`) as the default language.
  - **English Support**: Renamed original README to `README.en.md`.
  - **Visuals**: Added tech stack tables, badges, and improved formatting.
- **Organization**: Moved `API.md` to the `docs/` folder.

---

### 🐛 Bug Fixes & Polish

- **Build Fix**: Resolved `Module not found: Can't resolve 'preline/plugin'` by adjusting Tailwind configuration.
- **Icon Consistency**: Standardized all icons to use `lucide-react`.
- **Clean Code**: Removed unused imports and legacy code blocks.

---

### 📂 File Changes Summary

- `src/app/admin/page.jsx` (Refactored)
- `src/hooks/useAdminDashboard.js` (New)
- `src/components/ui/LoadingScreen.jsx` (New)
- `src/components/ui/ItemCardSkeleton.jsx` (New)
- `scripts/supabase-init.js` (New)
- `docs/DEVELOPMENT.md` (New)
- `guidelines.md` (New)
- `README.md` (Updated/Renamed)
