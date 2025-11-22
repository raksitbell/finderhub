# FinderHub - Lost & Found Management System

[![Thai](https://img.shields.io/badge/lang-Thai-blue.svg)](README.th.md)

FinderHub is a modern, responsive web application designed to manage lost and found items efficiently. It features a public interface for users to search and report items, and a comprehensive admin dashboard for managing inventory.

## 🚀 Features

### Public Interface

- **Search & Filter**: Powerful search bar and category filters to quickly locate items.
- **Item Details**: Detailed view of found items including location, date, and description.
- **Report Found Items**: Easy-to-use modal for users to report items they have found.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Admin Dashboard

- **Inventory Management**: View all items in a table or card layout (mobile).
- **Add Item Wizard**: A guided 2-step process (Form -> Preview) to add new found items.
- **Status Tracking**: Track items as "Found" or "Returned".
- **Claim Management**: Process item claims with claimer details.
- **CRUD Operations**: Add, Edit (removed for simplicity), and Delete items.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Custom components + [Radix UI](https://www.radix-ui.com/) primitives (via shadcn/ui pattern).
- **Fonts**: Google Fonts (Inter/Kanit).

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── admin/           # Admin-specific components (Table, Filters, Header)
│   ├── modals/          # Dialog components (ItemModal, AdminItemModal, AddItemModal)
│   │   └── admin/       # Admin modal sub-components (AddItemForm, AddItemPreview)
│   ├── ui/              # Base UI elements (Button, Input, Select)
│   ├── KeyMetrics.jsx   # Dashboard statistics component
│   └── ...
├── hooks/               # Custom React hooks (useItems, useItemFilter)
└── lib/                 # Utility functions
```

## ⚡ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/finderhub.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    > **Note:** If you don't have a `.env` file, the script will prompt you to enter your Supabase URL and Anon Key to automatically create it.
4.  **Open your browser**:
    Navigate to `http://localhost:3000`.

## 📖 Documentation

For a detailed guide on the codebase structure and how components work, please refer to the [Development Guide](docs/DEVELOPMENT.md).

## 🎨 Design System

- **Glassmorphism**: Used in headers and modals for a modern, premium feel.
- **Color Palette**:
  - Primary: Emerald (Found), Slate (Returned/Neutral)
  - Accents: Red (Location), Blue (Date), Purple (Tags)
