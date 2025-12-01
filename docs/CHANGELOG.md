# Changelog

> [!NOTE]
> All notable changes to this project will be documented in this file.
>
> - For the Thai version, please see [บันทึกการเปลี่ยนแปลง (Thai Version)](./CHANGELOG.th.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.6.3] - 2025-12-01

### Fixed

- **Admin Form State**: Fixed an issue where the "Add Item" form would retain data from a previously edited item. The form now correctly resets to a blank state when opening the "Add Item" modal.

## [3.6.2] - 2025-11-28

### Improved

- **Responsiveness**: Optimized `ItemCard` layout for mobile devices by adjusting image height and padding for smaller screens.

## [3.6.1] - 2025-11-28

### Fixed

- **Add Item Error**: Fixed "Failed to add item" error by improving error handling in `DataManager` to expose specific server errors.
- **Null ID Error**: Fixed "null value in column id" error by conditionally omitting the `id` field for new items.
- **Orphaned Images**: Implemented automatic image deletion if item creation fails.

### Improved

- **Preview Interaction**: Enabled clicking on the item card in the preview step to view full details via `ItemModal`.
- **Error Reporting**: `DataManager` now throws specific error messages from the API response for better debugging.

## [3.6.0] - 2025-11-28

### Added

- **Notifications**: Implemented toast notifications (using `sonner`) for key actions:
  - Item Upload, Add, Edit, Delete, Claim, and Purge.
  - Image Upload progress feedback.

### Changed

- **Image Handling**: Implemented automatic deletion of old images from Supabase storage when an item's image is replaced or the item is deleted.
- **Refactoring**: Refactored `useAdminDashboard` hook into smaller, more manageable hooks:
  - `useItemFilters`: Manages filtering and sorting logic.
  - `useItemActions`: Encapsulates API interactions and notifications.

## [3.5.1] - 2025-11-26

### Fixed

- **Build Error**: Fixed `ReferenceError: Link is not defined` in developer documentation page (`/dev`).

## [3.5.0] - 2025-11-26

### Added

- **Documentation**: Added a Table of Contents to the developer documentation pages (`/dev/[slug]`) for better navigation.

### Changed

- **Dev Portal**: Removed the language selector from the main developer portal page (`/dev`). All documentation is now listed together.
- **Documentation**: Cleaned up documentation files (`DEVELOPMENT.md`, `TECH.md`, `DEVELOPMENT.th.md`) by removing emojis from headings and updating the Table of Contents structure for a cleaner, more professional look.
- **Documentation**: Improved Table of Contents generation to correctly support Thai characters and manual IDs.

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
