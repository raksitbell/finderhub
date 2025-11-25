# 📘 FinderHub Development Guide

> [!NOTE]
> This document provides a deep dive into the FinderHub codebase.
>
> - For the Thai version, please see [คู่มือการพัฒนา (Thai Version)](./DEVELOPMENT.th.md).
> - For API documentation, please see [API Docs](./API.md).

This guide offers a comprehensive overview of the FinderHub architecture, explaining the intricate workings of key components, data flows, and utility functions to facilitate seamless future development and maintenance.

---

## 📑 Table of Contents

1.  [🏗️ Project Structure](#-project-structure)
2.  [🧩 Key Components](#-key-components)
    - [Admin Dashboard](#admin-dashboard)
    - [Modals & Wizards](#modals--wizards)
    - [Loading Strategies](#loading-strategies)
    - [Shared UI Elements](#shared-ui-elements)
3.  [🧠 State Management](#-state-management)
4.  [💾 Data Layer & Supabase](#-data-layer--supabase)
5.  [🛠️ Scripts & Tooling](#-scripts--tooling)
6.  [🎨 Styling & UI System](#-styling--ui-system)
7.  [📜 Changelog](#-changelog)

---

## 🏗️ Project Structure

The project adheres to a robust **Next.js App Router** architecture, ensuring scalability and maintainability.

### 🖼️ Image Handling

The system implements an efficient image handling strategy to minimize server and storage load:

1.  **Instant Preview**: When a user selects an image, a local Object URL is created for immediate preview (no upload occurs yet).
2.  **Deferred Upload**: The actual upload only happens when the user clicks "Confirm" in the final step.
3.  **Optimization**: Images are automatically converted to WebP before being saved to Supabase Storage to reduce file size.

### 📂 Root Directory

Key configuration files and documentation located at the top level:

- `📄 package.json`: Manages dependencies and scripts.
- `📄 .env`: Environment variables.
- `📄 README.md`: Getting started documentation.
- `📂 public/`: Static assets (images, icons).

### 📂 Source Code (src/)

The core application code resides entirely within the `src/` directory:

```
src/
├── 📂 app/                 # App Router: Page routes and layouts
│   ├── 📄 layout.js        # Root layout with global providers and scripts
│   ├── 📄 page.jsx         # Public landing page (Item Grid)
│   ├── 📂 admin/           # Protected admin routes
│   └── 📂 login/           # Authentication routes
├── 📂 components/          # React Components
│   ├── 📂 admin/           # Admin-specific components (Tables, Headers)
│   ├── 📂 modals/          # Dialogs and Wizards
│   └── 📂 ui/              # Reusable base UI elements (Buttons, Inputs)
├── 📂 hooks/               # Custom React Hooks (Logic encapsulation, e.g., useState, useEffect, useRouter)
├── 📂 lib/                 # Utilities, API clients, and database connections
└── 📂 scripts/             # Maintenance and setup scripts
```

---

## 🧩 Key Components

### 🛡️ Admin Dashboard

The **Admin Dashboard** (`src/app/admin/page.jsx`) serves as the central interface for item management.

#### 🧠 `useAdminDashboard` Hook

This custom hook (`src/hooks/useAdminDashboard.js`) acts as the **brain** of the dashboard, decoupling logic from the UI.

- **Data Fetching**: Automatically loads items on mount.
- **Filtering Engine**: Implements client-side filtering for:
  - 🔍 Search (Name, Location, Description)
  - 🏷️ Category (IT, Personal, Stationery)
  - 📍 Status (Found/Returned)
- **State Control**: Manages the visibility of all modals (Add, View, Claim).

#### 📊 `AdminTable` & `AdminMobileCard`

We implement a **Responsive Design** strategy here to ensure optimal UX/UI across all devices:

- **Desktop**: Renders a detailed `<table>` with sortable columns.
- **Mobile**: Switches to a card-based layout (`AdminMobileCard`) for better UX.

Key sub-components include:

- **`AdminTableFilters`**: Manages the UI for searching, category filtering, and status filtering.
- **`AdminTableRow`**: Responsible for rendering individual table rows.

### 🪄 Modals & Wizards

We use modals to handle complex workflows without navigating away from the main context.

#### ➕ `AddItemModal` (The Wizard)

A 2-step process for adding new items:

1.  **📝 Step 1: Data Entry (`AddItemForm`)**

    - Captures item details (Name, Category, Location).
    - **Smart Upload**: Supports native Camera 📷, Gallery 🖼️, and File 📁 selection.
    - **Auto-Date**: "Now" button to quickly set the current timestamp.

    ⬇️ _Next_

2.  **👁️ Step 2: Verification (`AddItemPreview`)**
    - Displays a live preview of the `ItemCard` exactly as it will appear publicly.
    - Allows users to **Confirm** ✅ or **Back** ↩️ to edit.

#### 📢 `FoundItemModal`

A modal for public users to report found items (similar to `AddItemModal` but for the public facing side).

#### 📄 `ItemModal`

A detailed view modal for public users, displaying full item information and large images.

#### 🔍 `AdminItemModal` & `ClaimItemModal`

Views and management tools for administrators:

- **`AdminItemModal`**: Detailed item inspection with action buttons.
- **`ClaimItemModal`**: Form for recording claimer details (Name, Phone) when changing status to "Returned".

### 🧱 Shared UI Elements

Located in `src/components/ui`, we have a set of base components built with **Radix UI** and **Tailwind CSS**:

- **`Badge`**: Status indicators (e.g., "Found", "Returned").
- **`Button`**: Buttons with various variants (default, outline, ghost).
- **`Card`**: Base container for data cards.
- **`Dialog`**: Foundation for all modals.
- **`Input` / `Textarea`**: Form input fields.
- **`Table`**: Responsive table structure.
- **`Select`**: Dropdown menus.

### ⏳ Data Loading

We employ best-practice initial data loading strategies:

- **🚀 Global Loader (`LoadingScreen`)**: A full-screen transition used during initial auth checks and critical data fetches.
- **💀 Skeletons (`ItemCardSkeleton`)**: Used in the public grid to prevent **Cumulative Layout Shift (CLS)** while images and data load.
- **🖼️ Progressive Image Loading**: `ItemCard` features a built-in blur-up effect, showing a pulsing placeholder until the high-res image is ready.

---

## 🧠 State Management

We prioritize **Simplicity** and **Local State** over complex global stores.

- **React Hooks**: `useState` and `useEffect` drive 90% of the application.
- **Prop Drilling**: Used effectively for passing data to immediate children (e.g., `AdminPage` -> `AdminTable`).
- **No Redux/Context**: The current scope does not require heavy global state, keeping the bundle size small.

---

## 💾 Data Layer & Supabase

The application interacts directly with **Supabase** for backend services.

### `DataManager` Class (`src/lib/data.js`)

A static class acting as an abstraction layer over the Supabase SDK.

| Method                  | Description                                                 |
| :---------------------- | :---------------------------------------------------------- |
| `getAllItems()`         | Fetches all inventory items, ordered by date.               |
| `addItem(item)`         | Inserts a new item.                                         |
| `updateItemStatus(...)` | Updates status to `false` (Returned) and logs claimer info. |
| `deleteItem(id)`        | Permanently removes an item and its associated image.       |

---

## 🛠️ Scripts & Tooling

### 🤖 `scripts/supabase-init.js`

**Intelligent Setup Assistant & Dev Server Launcher**

This script replaces the standard `next dev` command to ensure a smooth development environment:

1.  **Environment Check**: Checks for the existence of `.env`.
2.  **Interactive Setup**: If `.env` is missing, it prompts the user for Supabase credentials and creates the file.
3.  **Connection Test**: Validates the Supabase connection before starting the server.
4.  **Delayed Start**: Waits for 3 seconds to ensure everything is ready, then spawns `npx next dev`.

This approach eliminates common "command not found" errors and ensures the database is reachable before the app starts.

### 🧹 `npm run dev:clean`

> **Note:** If you encounter "Unable to acquire lock" errors or port conflicts, run:
>
> ```bash
> npm run dev:clean
> ```
>
> This command automatically kills stale processes and removes lock files.

## 🎨 Styling & UI System

Our design system is built on a modern stack for speed and consistency.

- **🌊 Tailwind CSS**: Utility-first styling for rapid UI development.
- **🧩 Shadcn UI**: Provides accessible, unstyled base components (Dialogs, Inputs) which we customize.
- **✨ Lucide React**: A consistent, lightweight icon set used throughout the app.
- **📱 Responsive Design**: Mobile-first approach ensuring usability on all screen sizes.

## 📜 Changelog

For a detailed history of changes, please refer to the [Changelog](CHANGELOG.md).
