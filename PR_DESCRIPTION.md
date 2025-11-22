# Refactor Components & Enhance Add Item Flow

## 📝 Description

This PR focuses on refactoring the `src/components` directory for better maintainability and enhancing the "Add Item" user experience. It introduces a 2-step wizard for adding items, improves the preview functionality, and fixes several UI/UX issues including filename display and missing icons.

## 🚀 Key Changes

### ♻️ Refactoring

- **Component Extraction**:
  - `AddItemForm`: Extracted form logic from `AddItemModal` to separate concerns.
  - `AddItemPreview`: Created a dedicated component for the item preview step.
  - `ClaimerInfoCard`: Extracted claimer details display into a reusable component.
  - `KeyMetrics`: Created a reusable component for displaying dashboard statistics, used in both Public and Admin headers.
- **Documentation**: Added JSDoc comments to key components (`AddItemModal`, `ItemCard`, `KeyMetrics`, etc.) for better code documentation.

### ✨ New Features & Enhancements

- **Add Item Wizard**:
  - Transformed the `AddItemModal` into a **2-step wizard** (Form -> Preview -> Publish).
  - Implemented a **Preview Step** that allows users to review the item card before publishing.
  - Added a **"Back to Edit"** functionality.
- **Filename Display**: Fixed an issue where the uploaded filename was not visible. It now persists and displays correctly after selection.
- **Localization**: Updated placeholder texts and labels to Thai (e.g., "ค้นหา...", "รายการทรัพย์สินที่พบ").

### 🐛 Bug Fixes

- **ItemCard**: Fixed missing imports for `CheckCircle`, `XCircle`, and other icons that were causing runtime errors.
- **Preview UI**: Simplified the preview card by removing excessive shadows and hover animations for a cleaner look.

## ✅ Verification

- [x] **Add Item Flow**: Verified the complete flow: Form Input -> Preview (Scrollable/Responsive) -> Publish.
- [x] **File Upload**: Confirmed that the original filename is displayed correctly.
- [x] **Admin Dashboard**: Checked that the new `KeyMetrics` component renders correctly in the header.
- [x] **Responsiveness**: Verified the preview modal works well on mobile devices.
