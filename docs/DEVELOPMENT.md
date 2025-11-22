# FinderHub Development Guide

This document provides a detailed overview of the FinderHub codebase, explaining how key components and functions work to assist future development and maintenance.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Key Components](#key-components)
    - [Admin Dashboard](#admin-dashboard)
    - [Modals](#modals)
    - [Loading States](#loading-states)
    - [Shared Components](#shared-components)
3.  [State Management](#state-management)
4.  [Data Layer](#data-layer)
5.  [Scripts & Tooling](#scripts--tooling)
6.  [Styling & UI](#styling--ui)

---

## Project Structure

The project follows a standard Next.js App Router structure:

- `src/app`: Contains the page routes (`/`, `/admin`, `/login`).
- `src/components`: Reusable UI components, organized by feature (`admin`, `modals`) or type (`ui`).
- `src/hooks`: Custom React hooks for logic reuse.
- `src/lib`: Utility functions and configuration (Supabase client, data helpers).
- `scripts`: Node.js scripts for project maintenance and setup.

## Key Components

### Admin Dashboard

The Admin Dashboard (`src/app/admin/page.jsx`) is the core interface for managing items. It is powered by the `useAdminDashboard` hook.

- **`useAdminDashboard` Hook**: Encapsulates all the logic for the dashboard, including:
  - Fetching data from Supabase.
  - Filtering and sorting items.
  - Managing modal states (Add, View, Claim).
  - Handling CRUD operations (Add, Delete, Update Status).
- **`AdminTable`**: Displays the list of items. It uses a responsive design, showing a table on desktop and cards on mobile (`AdminMobileCard`).
- **`AdminHeader`**: Displays key metrics (`KeyMetrics`) and user information.

### Modals

Modals are used for complex interactions to keep the main UI clean.

- **`AddItemModal`**: A 2-step wizard for adding new items.
  - **Step 1 (`AddItemForm`)**: A form for entering item details and uploading an image.
  - **Step 2 (`AddItemPreview`)**: A live preview of the item card before publishing.
- **`AdminItemModal`**: Displays detailed information about an item.
  - Uses `ClaimerInfoCard` to show claimer details if the item has been returned.
  - Provides actions to Claim or Delete the item.

### Loading States

To ensure a smooth user experience, we implement several loading patterns:

- **`LoadingScreen`**: A global, full-screen overlay used during initial application load or critical data fetching (e.g., in `AdminPage`).
- **`ItemCardSkeleton`**: A skeleton loader that mimics the structure of `ItemCard`. It is used in the public grid (`src/app/page.jsx`) to prevent layout shift while items are loading.
- **Image Loading**: The `ItemCard` component handles its own image loading state, displaying a pulsing placeholder until the image is fully loaded.

### Shared Components

- **`ItemCard`**: The primary component for displaying an item's summary. Used in the public grid, admin mobile view, and add item preview.
- **`KeyMetrics`**: Displays statistics (Total, Found, Returned) with different visual variants for Public and Admin views.

## State Management

State is primarily managed using React's `useState` and `useEffect` hooks within page components or custom hooks.

- **Global State**: There is no global state library (Redux/Zustand) as the application scope is manageable with local state and prop drilling.
- **Server State**: Data is fetched directly from Supabase and stored in local state (`inventoryItems`).

## Data Layer

- **`src/lib/supabase.js`**: Initializes the Supabase client.
- **`src/lib/data.js`**: Contains the `DataManager` class, which abstracts database operations:
  - `getAllItems()`: Fetches all items.
  - `addItem(item)`: Inserts a new item.
  - `updateItemStatus(id, status, claimerData)`: Updates an item's status.
  - `deleteItem(id)`: Deletes an item.

## Scripts & Tooling

- **`scripts/supabase-init.js`**: An automated script that checks for the existence of a `.env` file. If missing, it interactively prompts the user for Supabase credentials and creates the file. This runs automatically before `npm run dev`.

## Styling & UI

- **Tailwind CSS**: Used for all styling.
- **Preline UI**: Integrated for pre-built components and plugins.
- **Shadcn UI**: Used for base accessible components (Dialog, Input, Button).
- **Lucide React**: Provides the icon set.
