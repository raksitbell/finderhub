# 🔎 FinderHub - Lost & Found Management System

[![Thai](https://img.shields.io/badge/lang-Thai-blue.svg)](README.md)

> **FinderHub** is a modern, responsive web application designed to manage lost and found items efficiently. It bridges the gap between people who have lost items and the administrators who manage found inventory.

---

## 🚀 Key Features

### 👥 Public Interface

- 🔍 **Smart Search & Filter**: Powerful search bar and category filters to quickly locate items.
- 📄 **Item Details**: Detailed view of found items including location, date, and description with clear images.
- 📢 **Report Found Items**: Easy-to-use modal for users to report items they have found.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.
- ⚡ **Smooth Loading**: Skeleton screens and optimized image loading for a seamless experience.

### 🛡️ Admin Dashboard

- 📊 **Inventory Management**: View all items in a table or card layout (mobile).
- ✨ **Add Item Wizard**: A guided 2-step process (Form -> Preview) to add new found items.
- 🏷️ **Status Tracking**: Track items as "Found" or "Returned".
- 📝 **Claim Management**: Process item claims with claimer details (name, phone).
- ⚙️ **CRUD Operations**: Add, Edit, and Delete items.

---

## 🛠️ Tech Stack

| Category          | Technology                                                                                                                                                                                | Description                                  |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| **Framework**     | ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)                                                                                     | React Framework for the web                  |
| **Styling**       | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)                                                                     | Utility-first CSS framework                  |
| **UI Components** | ![Preline UI](https://img.shields.io/badge/Preline_UI-blue?style=flat-square) ![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-000000?style=flat-square&logo=shadcnui&logoColor=white) | Beautiful and accessible component libraries |
| **Icons**         | ![Lucide React](https://img.shields.io/badge/Lucide_React-F7DF1E?style=flat-square&logo=javascript&logoColor=black)                                                                       | Modern icon set                              |
| **Fonts**         | **Google Fonts**                                                                                                                                                                          | Inter and Kanit fonts                        |

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── admin/           # Admin-specific components (Table, Filters, Header)
│   ├── modals/          # Dialog components (ItemModal, AdminItemModal, AddItemModal)
│   │   └── admin/       # Admin modal sub-components (AddItemForm, AddItemPreview)
│   ├── ui/              # Base UI elements (Button, Input, Select, LoadingScreen)
│   ├── KeyMetrics.jsx   # Dashboard statistics component
│   └── ...
├── hooks/               # Custom React hooks (useItems, useItemFilter)
├── lib/                 # Utility functions
└── scripts/             # Setup and maintenance scripts
```

---

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
    > **💡 Smart Setup:** This command automatically checks for your `.env` file and Supabase connection. If missing, it will prompt you for credentials and start the server seamlessly.
4.  **Open your browser**:
    Navigate to `http://localhost:3000`.

---

## 🔐 Security

If you discover a security vulnerability, please refer to our [Security Policy](SECURITY.md) for reporting instructions.

---

## 📖 Documentation

For a detailed guide on the codebase structure and how components work, please refer to the [Development Guide](docs/DEVELOPMENT.md).

---

## 🎨 Design System

- **Glassmorphism**: Used in headers and modals for a modern, premium feel.
- **Color Palette**:
  - 🟢 **Primary**: Emerald (Found), Slate (Returned/Neutral)
  - 🔴 **Accents**: Red (Location), 🔵 Blue (Date), 🟣 Purple (Tags)
