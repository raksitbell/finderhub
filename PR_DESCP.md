# Feature: Automated Supabase Environment Setup

## 📝 Description

This PR introduces an automated setup script to streamline the developer onboarding process. When starting the development server, the system now checks for the existence of a `.env` file. If missing, it interactively prompts the user for their Supabase credentials and automatically generates the file.

## 🚀 Key Changes

### 🛠️ Developer Experience (DX)

- **New Script**: Added `scripts/supabase-init.js` which handles the environment check and interactive prompt.
- **NPM Script Update**: Modified the `dev` script in `package.json` to execute `supabase-init.js` before starting the Next.js server (`next dev`).
- **Documentation**: Updated both `README.md` and `README.th.md` with instructions regarding this new automated setup flow.

## 📋 Implementation Details

- **Logic**:
  1.  Checks if `.env` exists in the root directory.
  2.  If found -> Starts Next.js server immediately.
  3.  If missing -> Prompts user for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  4.  Creates `.env` file with the provided values.
  5.  Starts Next.js server.

## ✅ Verification

- [x] **Fresh Setup**: Verified that deleting `.env` and running `npm run dev` triggers the prompt.
- [x] **Existing Setup**: Verified that having an existing `.env` skips the prompt and starts the server normally.
- [x] **File Creation**: Confirmed that the `.env` file is created correctly with the input values.
