# 📘 FinderHub Development Guide

> [!NOTE]
> This document provides a deep dive into the FinderHub codebase. For the Thai version, please see [คู่มือการพัฒนา (Thai Version)](./DEVELOPMENT.th.md).

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

---

## 🏗️ Project Structure

The project adheres to a robust **Next.js App Router** architecture, ensuring scalability and maintainability.

```
src/
├── 📂 app/                 # App Router: Page routes and layouts
│   ├── 📄 layout.js        # Root layout with global providers
│   ├── 📄 page.jsx         # Public landing page (Item Grid)
│   ├── 📂 admin/           # Admin protected routes
│   └── 📂 login/           # Authentication routes
├── 📂 components/          # React Components
│   ├── 📂 admin/           # Admin-specific components (Tables, Headers)
│   ├── 📂 modals/          # Dialogs and Wizards
│   └── 📂 ui/              # Reusable base UI elements (Buttons, Inputs)
├── 📂 hooks/               # Custom React Hooks (Logic encapsulation)
├── 📂 lib/                 # Utilities, Constants, and API clients
└── 📂 scripts/             # Maintenance and setup scripts
```

---

## 🧩 Key Components

### 🛡️ Admin Dashboard

The **Admin Dashboard** (`src/app/admin/page.jsx`) is the command center for inventory management. It orchestrates complex interactions through a unified interface.

#### 🧠 `useAdminDashboard` Hook

This custom hook (`src/hooks/useAdminDashboard.js`) acts as the **brain** of the dashboard, decoupling logic from the UI.

- **Data Fetching**: Automatically loads items on mount.
- **Filtering Engine**: Implements client-side filtering for:
  - 🔍 Search (Name, Location, Description)
  - 🏷️ Category (IT, Personal, Stationery)
  - 📍 Status (Found/Returned)
- **State Control**: Manages the visibility of all modals (Add, View, Claim).

#### 📊 `AdminTable` & `AdminMobileCard`

To ensure a seamless experience across devices, the dashboard implements a **responsive strategy**:

- **Desktop**: Renders a detailed `<table>` with sortable columns.
- **Mobile**: Switches to a card-based layout (`AdminMobileCard`) for better touch interaction.

### 🪄 Modals & Wizards

We use modals to handle complex workflows without navigating away from the main context.

#### ➕ `AddItemModal` (The Wizard)

A sophisticated 2-step process for reporting found items:

1.  **📝 Step 1: Data Entry (`AddItemForm`)**

    - Captures item details (Name, Category, Location).
    - **Smart Upload**: Supports Camera 📷, Gallery 🖼️, and File 📁 selection natively.
    - **Auto-Date**: "Now" button to quickly set the current timestamp.

    ⬇️ _Next_

2.  **👁️ Step 2: Verification (`AddItemPreview`)**
    - Displays a live preview of the `ItemCard` exactly as it will appear publicly.
    - Allows users to **Confirm** ✅ or **Back** ↩️ to edit.

#### 🔍 `AdminItemModal`

A detailed view for administrators to inspect items.

- **Dynamic Actions**: Shows "Claim Item" button only if the item is currently "Found".
- **Claimer Info**: If returned, displays the claimer's contact details via `ClaimerInfoCard`.

### ⏳ Loading Strategies

Perceived performance is critical. We employ multiple strategies to keep the UI responsive:

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

An intelligent setup assistant that runs before the development server.

- **Checks**: Verifies if `.env` exists.
- **Prompts**: If missing, interactively asks for `NEXT_PUBLIC_SUPABASE_URL` and `ANON_KEY`.
- **Creates**: Generates the `.env` file automatically, ensuring new developers can start immediately.

---

## 🎨 Styling & UI System

Our design system is built on a modern stack for speed and consistency.

- **🌊 Tailwind CSS**: Utility-first styling for rapid UI development.
- **🧩 Shadcn UI**: Provides accessible, unstyled base components (Dialogs, Inputs) which we customize.
- **✨ Lucide React**: A consistent, lightweight icon set used throughout the app.
- **📱 Responsive Design**: Mobile-first approach ensuring usability on all screen sizes.
