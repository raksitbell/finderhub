# Changelog

[![Thai](https://img.shields.io/badge/lang-Thai-blue.svg)](CHANGELOG.th.md)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.5.0] - 2025-11-26

### Added

- **Admin Features**: Added "Update Item" functionality.
  - Admins can now edit existing items (name, category, date, location, description, contact info, image) directly from the dashboard.
  - Reused the "Add Item" form logic for a consistent editing experience.
- **Developer**: Added GitHub repository link to the Developer Portal (`/dev`).

### Changed

- **Public UI**: Hidden the "Description" field from the public Item Modal to protect sensitive details. It remains visible in the Admin Dashboard.

### Fixed

- **Code Quality**: Resolved an "Argument name clash" error in `AddItemModal.jsx` that caused build warnings.
- **Bug Fixes**: Fixed an issue where the date picker would reset to the current date when editing an item. It now correctly displays the original date from the database.

## [3.4.0] - 2025-11-25

### Added

- **UI/UX**: Improved Date/Time Picker experience.
  - Implemented a custom `DateTimePicker` component with validation logic.
  - Added visual error feedback (red border and text) for invalid future dates.
  - Added browser alert for invalid date selection.
  - Auto-set the date/time picker to the current time on load if empty.
- **Bug Fixes**:
  - Fixed `undefined is not an object` error related to Preline UI overlay initialization.
  - Fixed CSS import issues for Preline Datepicker.

## [3.3.0] - 2025-11-25

### Added

- **UI/UX**: Enhanced image viewing experience.
  - Added clickable full-size image modals for "Proof of Return" in Admin Dashboard.
  - Added clickable full-size image modals for item headers in both Public and Admin views.
- **Accessibility**: Added `DialogTitle` to image modals for screen reader support.
- **Loading States**: Added visual feedback (spinner and disabled inputs) to the "Confirm Return" modal (`ClaimItemModal`).

### Changed

- **Dev Portal**: Set default language to Thai (`th`) and added API documentation visibility in Thai view.
- **Documentation**: Standardized header notes in `CHANGELOG` and `DEVELOPMENT` guides.
- **Schema**: Added `UPDATE` and `DELETE` policies for the `claim-evidence` bucket to ensure full admin control.

## [3.2.0] - 2025-11-25

### Added

- **Localization**: Translated the Login page (`/login`) to Thai.

### Changed

- **UX/Loading**: Refined the "Refresh" behavior in the Admin Dashboard. It now triggers a background refresh with a table-only loading indicator instead of a full page reload.

## [3.1.0] - 2025-11-25

### Added

- **Admin Tools**: New tools for administrators.
  - **Purge**: Functionality to permanently delete "Found" items older than a specified number of days (default 90).
  - **Refresh**: Button to reload table data without refreshing the page.
- **UI**: Added Refresh and Purge buttons to the Admin Table header.

## [3.0.0] - 2025-11-25

### Added

- **Claimer Info Log**: Comprehensive claimer information logging system.
  - Added "Social Media Contact" and "Proof Evidence (Image)" fields to the return flow.
  - Display claimer details and proof image in returned item details.
- **Database**: Added `claims` table and `claim-evidence` storage bucket.
- **API**: Updated `items` API to handle claim data insertion and retrieval.

### Changed

- **Admin UI**: Updated `ClaimItemModal` and `ClaimerInfoCard` to support new data fields.

## [2.3.1] - 2025-11-25

### Added

- **Admin Header**: Mobile responsive dropdown menu with full-screen overlay for better accessibility on small screens.
- **Logout**: Added a loading screen indicator during the logout process for better user feedback.

### Changed

- **UI/UX**: Global color update from Green/Teal to Blue/Indigo for a more professional and consistent theme.
  - Updated Admin Header, Public Header, Status Badges, and Dashboard Metrics.

### Refactoring

- **Cleanup**: Removed duplicate `ItemStatusBadge 2.jsx` file.
- **Organization**: Moved `ItemStatusBadge.jsx` from `src/components/shared` to `src/components/items` and removed the empty `shared` directory.

### Fixed

- **Mobile Menu**: Resolved stacking context and overflow issues that prevented the mobile menu from being clickable.
- **Logout**: Fixed a runtime error ("undefined is not an object") when logging out from the mobile menu.

## [2.2.0] - 2025-11-24

### Added

- **Localization**: Translated Admin Dashboard modals and filters to Thai.
- **Typography**: Switched global font to **Kanit** for better Thai language support.
- **Typography**: Added **Geist** font specifically for the FinderHub logo.

### Fixed

- **Admin Modal**: Fixed an issue where the Admin Item Modal would not close automatically after deleting an item.

### Changed

- **UI/UX**: Improved font consistency across the application.

## [2.1.1] - 2025-11-24

### Changed

- **Image Optimization**: Enhanced the image converter to ensure efficient WebP conversion before upload.

### Fixed

- **Double Upload**: Fixed a bug where images were being uploaded twice (once as original, once as WebP). Now only the optimized WebP version is stored.
- **Dev Server Locks**: Resolved recurring "Unable to acquire lock" errors that prevented the dev server from starting.
- **Accessibility**: Added missing `DialogDescription` components to `AddItemModal`, `ItemModal`, `AdminItemModal`, and `ClaimItemModal` to fix accessibility warnings.
- **Source Maps**: Resolved source map warnings related to Preline UI in the development console.

## [2.1.0] - 2025-11-23

### Added

- **Deferred Image Upload**: Images are now previewed locally using Object URLs and only uploaded to Supabase when the user confirms the addition.
- **Instant Preview**: Immediate visual feedback when selecting an image file in the Add Item wizard.
- **Dev Script**: Added `npm run dev:clean` command to automatically kill zombie processes and remove stale Next.js lock files.
- **Loading States**: Added visual feedback (spinners) during the final upload and publication step.

### Changed

- **Admin Dashboard**: Improved responsive design for mobile devices, switching to card views for better usability.
- **Documentation**: Updated `README.md` and `docs/DEVELOPMENT.th.md` to reflect the new image handling flow and development scripts.

## [2.0.0] - 2025-11-22

### Added

- **Project Restructure**: Major reorganization of the codebase for better scalability.
- **Documentation**: Comprehensive update of development guides and API documentation.

## [1.0.0] - 2025-11-2

### Added

- **Public Gallery**: Main landing page displaying a grid of lost and found items with search and filtering.
- **Admin Dashboard**: Protected route for administrators to manage inventory (Add, Edit, Delete, Return).
- **Authentication**: Secure login system using Supabase Auth.
- **Item Management**: Full CRUD operations for lost and found items.
- **Image Upload**: Integration with Supabase Storage for item images.
- **Responsive UI**: Modern, responsive interface built with Tailwind CSS and Shadcn UI.
- **Supabase Integration**: `DataManager` class for abstracting database interactions.
