"use client";

import { useEffect } from "react";
import Script from "next/script";
import styles from "./sitemap.module.css";

export default function SitemapViewer() {
  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.contentLoaded();
    }
  }, []);

  return (
    <div className={styles.container}>
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.mermaid.initialize({
            startOnLoad: true,
            theme: "default",
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
              curve: "basis",
            },
            securityLevel: "loose",
          });
          window.mermaid.contentLoaded();
        }}
      />

      <h1 className={styles.title}>FinderHub Project Sitemap</h1>
      <p className={styles.subtitle}>
        Complete System Architecture & Flow Diagrams
      </p>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>1. Application Routes & Pages</h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart TD
    Root([FinderHub Application]) --> HomePage[Home Page<br/>/]
    Root --> LoginPage[Login Page<br/>/login]
    Root --> AdminPage[Admin Dashboard<br/>/admin]
    
    HomePage --> PublicFeatures[Public Features]
    PublicFeatures --> BrowseItems[Browse Items<br/>Filter by Status: Found only]
    PublicFeatures --> SearchItems[Search Items<br/>by name, description, location]
    PublicFeatures --> FilterCategory[Filter by Category<br/>IT/Gadget, Personal, Stationery, Other]
    PublicFeatures --> ViewItem[View Item Details<br/>ItemModal]
    PublicFeatures --> ReportFound[Report Found Item<br/>FoundItemModal]
    
    LoginPage --> AuthForm[Email/Password Form]
    AuthForm --> SupabaseAuth[Supabase Auth]
    SupabaseAuth -->|Success| RedirectAdmin[Redirect to /admin]
    SupabaseAuth -->|Failed| ShowError[Show Error]
    
    AdminPage --> AdminFeatures[Admin Features]
    AdminFeatures --> ViewAllItems[View All Items<br/>Found & Returned]
    AdminFeatures --> AddItem[Add New Item<br/>AddItemModal]
    AdminFeatures --> EditItem[Edit Item Details<br/>AdminItemModal]
    AdminFeatures --> DeleteItem[Delete Item]
    AdminFeatures --> ClaimItem[Mark as Returned<br/>ClaimItemModal]
    AdminFeatures --> FilterSort[Filter & Sort<br/>Status, Category, Location, Date]
    AdminFeatures --> ViewStats[View Statistics<br/>Total, Found, Returned]
    
    style HomePage fill:#e1f5ff
    style AdminPage fill:#fff4e1
    style LoginPage fill:#ffe1e1
    style SupabaseAuth fill:#d4edda`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>2. API Routes & Endpoints</h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart LR
    Client[Client Application] --> APIItems["/api/items"]
    Client --> APIItemId["/api/items/[id]"]
    
    APIItems --> GETItems[GET /api/items<br/>Fetch all items<br/>with categories join]
    APIItems --> POSTItems[POST /api/items<br/>Create new item<br/>Requires: name, category, date, etc.]
    
    APIItemId --> GETItem[GET /api/items/:id<br/>Fetch single item<br/>by ID]
    APIItemId --> PUTItem[PUT /api/items/:id<br/>Update item<br/>status, claimer info]
    APIItemId --> DELETEItem[DELETE /api/items/:id<br/>Delete item<br/>+ remove image from storage]
    
    GETItems --> SupabaseServer[Supabase Server Client<br/>@supabase/ssr]
    POSTItems --> SupabaseServer
    GETItem --> SupabaseServer
    PUTItem --> SupabaseServer
    DELETEItem --> SupabaseServer
    
    SupabaseServer --> PostgreSQL[(PostgreSQL Database<br/>items table<br/>categories table)]
    DELETEItem --> StorageBucket[(Supabase Storage<br/>item-images bucket)]
    
    style APIItems fill:#e1f5ff
    style APIItemId fill:#e1f5ff
    style PostgreSQL fill:#d4edda
    style StorageBucket fill:#d4edda`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>3. Component Architecture</h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart TB
    RootLayout["Root Layout<br/>layout.js"] --> HomePage["Home Page<br/>page.jsx"]
    RootLayout --> LoginPage["Login Page<br/>login/page.jsx"]
    RootLayout --> AdminPage["Admin Page<br/>admin/page.jsx"]
    
    subgraph Level1["Pages Layer"]
        HomePage
        LoginPage
        AdminPage
    end
    
    subgraph Level2Public["Public Components"]
        direction TB
        PublicHeader["PublicHeader"]
        ItemCard["ItemCard"]
        ItemModal["ItemModal"]
        FoundItemModal["FoundItemModal"]
        Footer["Footer"]
        ItemCardSkeleton["ItemCardSkeleton"]
        
        HomePage --> PublicHeader
        HomePage --> ItemCard
        HomePage --> ItemModal
        HomePage --> FoundItemModal
        HomePage --> Footer
        HomePage --> ItemCardSkeleton
    end
    
    subgraph Level2Admin["Admin Components"]
        direction TB
        AdminHeader["AdminHeader"]
        AdminTable["AdminTable"]
        AdminTableFilters["AdminTableFilters"]
        AddItemModal["AddItemModal"]
        AdminItemModal["AdminItemModal"]
        ClaimItemModal["ClaimItemModal"]
        LoadingScreen["LoadingScreen"]
        
        AdminPage --> AdminHeader
        AdminPage --> AdminTable
        AdminPage --> AdminTableFilters
        AdminPage --> AddItemModal
        AdminPage --> AdminItemModal
        AdminPage --> ClaimItemModal
        AdminPage --> LoadingScreen
    end
    
    subgraph Level3Shared["Shared Components"]
        direction LR
        KeyMetrics["KeyMetrics"]
        SearchBar["SearchBar"]
        FinderHubLogo["FinderHubLogo"]
    end
    
    subgraph Level4UI["UI Components (shadcn/ui)"]
        direction TB
        Dialog["Dialog"]
        Button["Button"]
        Input["Input"]
        Select["Select"]
        Card["Card"]
        Badge["Badge"]
        Table["Table"]
        Label["Label"]
        Textarea["Textarea"]
    end
    
    PublicHeader -.->|uses| KeyMetrics
    PublicHeader -.->|uses| SearchBar
    PublicHeader -.->|uses| FinderHubLogo
    AdminHeader -.->|uses| KeyMetrics
    AdminHeader -.->|uses| FinderHubLogo
    AdminTable -.->|uses| SearchBar
    
    ItemCard -.->|uses| Badge
    ItemCard -.->|uses| Button
    ItemModal -.->|uses| Dialog
    FoundItemModal -.->|uses| Dialog
    AddItemModal -.->|uses| Dialog
    AddItemModal -.->|uses| Input
    AddItemModal -.->|uses| Button
    AddItemModal -.->|uses| Select
    AdminItemModal -.->|uses| Dialog
    ClaimItemModal -.->|uses| Dialog
    LoginPage -.->|uses| Card
    LoginPage -.->|uses| Input
    LoginPage -.->|uses| Button
    LoginPage -.->|uses| Label
    AdminTable -.->|uses| Table
    
    style RootLayout fill:#ff6b9d,stroke:#c2185b,stroke-width:3px,color:#fff
    style HomePage fill:#42a5f5,stroke:#1976d2,stroke-width:2px,color:#fff
    style AdminPage fill:#ffa726,stroke:#f57c00,stroke-width:2px,color:#fff
    style LoginPage fill:#ef5350,stroke:#c62828,stroke-width:2px,color:#fff
    style Level2Public fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style Level2Admin fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style Level3Shared fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style Level4UI fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Level1 fill:#fce4ec,stroke:#c2185b,stroke-width:2px`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>4. Data Flow & State Management</h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart LR
    UI[User Interface] --> useItems[useItems Hook]
    UI --> useItemFilter[useItemFilter Hook]
    UI --> useAdminDashboard[useAdminDashboard Hook]
    
    useItems --> DataManager[DataManager]
    useItemFilter --> useItems
    useAdminDashboard --> DataManager
    useAdminDashboard --> SupabaseClient[Supabase Client]
    
    DataManager --> ItemsAPI["/api/items"]
    DataManager --> ItemAPI["/api/items/:id"]
    
    SupabaseClient --> Storage[Supabase Storage]
    SupabaseClient --> Auth[Supabase Auth]
    
    ItemsAPI --> Database[(PostgreSQL)]
    ItemAPI --> Database
    ItemAPI --> Storage
    
    style Database fill:#d4edda
    style Storage fill:#d4edda
    style Auth fill:#d4edda`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>5. CRUD Operations Flow</h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart TD
    subgraph Create["CREATE Operation"]
        C1[User Clicks Add Item] --> C2[AddItemModal Opens]
        C2 --> C3[Fill Form: name, category, date, location, description, contact]
        C3 --> C4[Upload Image File]
        C4 --> C5[convertImageToWebP<br/>Resize to max 1024x1024]
        C5 --> C6[Upload to Supabase Storage<br/>item-images bucket]
        C6 --> C7[Get Public URL]
        C7 --> C8[Submit Form]
        C8 --> C9[DataManager.addItem]
        C9 --> C10["POST /api/items"]
        C10 --> C11[Supabase Insert<br/>items table]
        C11 --> C12[Refresh Data]
    end
    
    subgraph Read["READ Operation"]
        R1[Page Load] --> R2[useItems Hook]
        R2 --> R3[DataManager.getAllItems]
        R3 --> R4["GET /api/items"]
        R4 --> R5[Supabase Query<br/>SELECT with categories join<br/>ORDER BY date DESC]
        R5 --> R6[Return Items Array]
        R6 --> R7[Filter by Status<br/>Public: status=true only]
        R7 --> R8[Display in UI]
    end
    
    subgraph Update["UPDATE Operation"]
        U1[User Clicks Claim/Edit] --> U2[AdminItemModal/ClaimItemModal]
        U2 --> U3[Update Form Data<br/>status, claimer_name, claimer_phone]
        U3 --> U4[Submit Changes]
        U4 --> U5[DataManager.updateItemStatus]
        U5 --> U6["PUT /api/items/:id"]
        U6 --> U7[Supabase Update<br/>items table]
        U7 --> U8[Refresh Data]
    end
    
    subgraph Delete["DELETE Operation"]
        D1[User Clicks Delete] --> D2[Confirm Dialog]
        D2 --> D3[DataManager.deleteItem]
        D3 --> D4["DELETE /api/items/:id"]
        D4 --> D5[Fetch Item to get image URL]
        D5 --> D6[Delete Image from Storage<br/>item-images bucket]
        D6 --> D7[Delete Item from Database<br/>items table]
        D7 --> D8[Refresh Data]
    end
    
    style C11 fill:#d4edda
    style R5 fill:#d4edda
    style U7 fill:#d4edda
    style D7 fill:#d4edda`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>
          6. Authentication & Authorization Flow
        </h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart TD
    User[User] --> VisitPage{Visit Page}
    VisitPage -->|Public Route| HomePage[Home Page /<br/>No Auth Required]
    VisitPage -->|Admin Route| CheckSession{Check Session}
    
    CheckSession -->|No Session| LoginPage[Login Page /login]
    CheckSession -->|Has Session| VerifyAuth{Verify Auth}
    
    LoginPage --> LoginForm[Email/Password Form]
    LoginForm --> SubmitLogin[Submit Credentials]
    SubmitLogin --> SupabaseAuth[Supabase Auth<br/>signInWithPassword]
    SupabaseAuth --> AuthResult{Auth Result}
    
    AuthResult -->|Success| SetSession[Set Session Cookie<br/>via @supabase/ssr]
    AuthResult -->|Failed| ShowError[Show Error Message]
    ShowError --> LoginForm
    
    SetSession --> RedirectAdmin[Redirect to /admin]
    RedirectAdmin --> AdminPage[Admin Dashboard]
    
    AdminPage --> CheckAuthOnLoad[useAdminDashboard<br/>checkSession on mount]
    CheckAuthOnLoad --> GetSession[supabase.auth.getSession]
    GetSession --> SessionValid{Session Valid?}
    
    SessionValid -->|Yes| LoadData[Load Dashboard Data<br/>setUserEmail]
    SessionValid -->|No| RedirectLogin[Redirect to /login]
    
    AdminPage --> LogoutAction[Logout Action]
    LogoutAction --> SignOut[supabase.auth.signOut]
    SignOut --> ClearSession[Clear Session Cookie]
    ClearSession --> RedirectHome[Redirect to Home /]
    
    HomePage --> PublicAccess[Public Access<br/>View Found Items Only]
    AdminPage --> AdminAccess[Admin Access<br/>Full CRUD Operations<br/>View All Items]
    
    style LoginPage fill:#ffe1e1
    style AdminPage fill:#fff4e1
    style SupabaseAuth fill:#d4edda
    style PublicAccess fill:#e1f5ff
    style AdminAccess fill:#fff4e1`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>7. Database Schema & Storage</h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart TD
    ItemsTable[(items table<br/>id, name, category, location<br/>date, description, image<br/>status, contact, claimer info)]
    
    CategoriesTable[(categories table<br/>id, label)]
    
    StorageBucket[(item-images bucket<br/>WebP images storage)]
    
    ItemsTable -->|Foreign Key| CategoriesTable
    
    ItemsRLS[Items RLS<br/>SELECT: Public<br/>INSERT/UPDATE/DELETE: Auth]
    
    CategoriesRLS[Categories RLS<br/>SELECT: Public]
    
    StorageRLS[Storage Policies<br/>SELECT: Public<br/>INSERT/UPDATE/DELETE: Auth]
    
    ItemsTable --> ItemsRLS
    CategoriesTable --> CategoriesRLS
    StorageBucket --> StorageRLS
    
    DefaultCategories[Default Categories<br/>it_gadget, personal<br/>stationery, other]
    
    CategoriesTable --> DefaultCategories
    
    style ItemsTable fill:#d4edda
    style CategoriesTable fill:#d4edda
    style StorageBucket fill:#d4edda`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>8. Complete User Journey Flow</h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart TD
    Start([User Visits FinderHub]) --> HomePage[Home Page /]
    
    HomePage --> PublicActions{User Action}
    
    PublicActions -->|Browse| BrowseFlow[Browse Items Flow]
    PublicActions -->|Search| SearchFlow[Search Flow]
    PublicActions -->|Filter| FilterFlow[Filter Flow]
    PublicActions -->|View Details| ViewFlow[View Details Flow]
    PublicActions -->|Report Found| ReportFlow[Report Found Flow]
    PublicActions -->|Login| LoginFlow[Login Flow]
    
    BrowseFlow --> LoadItems[Load Items via useItems]
    LoadItems --> FetchAPI[GET /api/items]
    FetchAPI --> FilterFound[Filter: status = true]
    FilterFound --> DisplayGrid[Display ItemCard Grid]
    DisplayGrid --> ViewFlow
    
    SearchFlow --> EnterQuery[Enter Search Query]
    EnterQuery --> useItemFilter[useItemFilter Hook]
    useItemFilter --> FilterResults[Filter by name, description, location, category]
    FilterResults --> DisplayGrid
    
    FilterFlow --> SelectCategory[Select Category]
    SelectCategory --> CategoryFilter[CategoryFilter Component]
    CategoryFilter --> FilterByCategory[Filter items by category]
    FilterByCategory --> DisplayGrid
    
    ViewFlow --> ClickItem[Click ItemCard]
    ClickItem --> OpenModal[Open ItemModal]
    OpenModal --> ShowDetails[Show Item Details<br/>Image, Name, Category, Location, Date, Description, Contact]
    
    ReportFlow --> ClickReport[Click Report Found Button]
    ClickReport --> OpenFoundModal[Open FoundItemModal]
    OpenFoundModal --> ShowInstructions[Show Instructions<br/>How to report found items]
    
    LoginFlow --> NavigateLogin[Navigate to /login]
    NavigateLogin --> EnterCredentials[Enter Email/Password]
    EnterCredentials --> SubmitAuth[Submit to Supabase Auth]
    SubmitAuth --> AuthSuccess{Auth Success?}
    AuthSuccess -->|Yes| RedirectAdmin[Redirect to /admin]
    AuthSuccess -->|No| ShowError[Show Error Message]
    ShowError --> EnterCredentials
    
    RedirectAdmin --> AdminPage[Admin Dashboard]
    AdminPage --> CheckAuth[Check Session via useAdminDashboard]
    CheckAuth --> AuthValid{Session Valid?}
    AuthValid -->|Yes| LoadAdminData[Load All Items<br/>Show Stats]
    AuthValid -->|No| RedirectLogin[Redirect to /login]
    
    LoadAdminData --> AdminActions{Admin Action}
    
    AdminActions -->|Add Item| AddFlow[Add Item Flow]
    AdminActions -->|View Item| ViewAdminFlow[View Item Flow]
    AdminActions -->|Claim Item| ClaimFlow[Claim Item Flow]
    AdminActions -->|Delete Item| DeleteFlow[Delete Item Flow]
    AdminActions -->|Filter/Sort| FilterSortFlow[Filter & Sort Flow]
    AdminActions -->|Logout| LogoutFlow[Logout Flow]
    
    AddFlow --> OpenAddModal[Open AddItemModal]
    OpenAddModal --> FillForm[Fill Form Data]
    FillForm --> UploadImage[Upload Image]
    UploadImage --> ConvertWebP[Convert to WebP]
    ConvertWebP --> UploadStorage[Upload to Supabase Storage]
    UploadStorage --> GetURL[Get Public URL]
    GetURL --> SubmitForm[Submit Form]
    SubmitForm --> POSTAPI[POST /api/items]
    POSTAPI --> RefreshData[Refresh Items List]
    
    ViewAdminFlow --> ClickView[Click View Button]
    ClickView --> OpenAdminModal[Open AdminItemModal]
    OpenAdminModal --> ShowFullDetails[Show Full Details<br/>Including Claimer Info if Returned]
    
    ClaimFlow --> ClickClaim[Click Claim Button]
    ClickClaim --> OpenClaimModal[Open ClaimItemModal]
    OpenClaimModal --> EnterClaimerInfo[Enter Claimer Info<br/>Name, Phone]
    EnterClaimerInfo --> SubmitClaim[Submit Claim]
    SubmitClaim --> PUTAPI[PUT /api/items/:id<br/>Update status = false]
    PUTAPI --> RefreshData
    
    DeleteFlow --> ClickDelete[Click Delete Button]
    ClickDelete --> ConfirmDelete[Confirm Delete]
    ConfirmDelete --> DELETEAPI[DELETE /api/items/:id]
    DELETEAPI --> DeleteImage[Delete Image from Storage]
    DeleteImage --> DeleteDB[Delete from Database]
    DeleteDB --> RefreshData
    
    FilterSortFlow --> ApplyFilters[Apply Filters<br/>Status, Category, Location]
    ApplyFilters --> ApplySort[Apply Sort<br/>Name, Category, Date, Status]
    ApplySort --> UpdateDisplay[Update Table Display]
    
    LogoutFlow --> ClickLogout[Click Logout]
    ClickLogout --> SignOut[Sign Out from Supabase]
    SignOut --> ClearSession[Clear Session]
    ClearSession --> RedirectHome[Redirect to Home /]
    
    style HomePage fill:#e1f5ff
    style AdminPage fill:#fff4e1
    style LoginFlow fill:#ffe1e1
    style AddFlow fill:#fff4e1
    style ClaimFlow fill:#fff4e1`}
          </div>
        </div>
      </div>

      <div className={styles.diagramSection}>
        <h2 className={styles.diagramTitle}>
          10. Technology Stack & Dependencies
        </h2>
        <div className={styles.diagramContainer}>
          <div className={`mermaid ${styles.mermaid}`}>
            {`flowchart LR
    subgraph Frontend["Frontend Stack"]
        NextJS[Next.js 16.0.3<br/>React Framework]
        React[React 19.2.0<br/>UI Library]
        TailwindCSS[Tailwind CSS 4<br/>Styling]
        PrelineUI[Preline UI 3.2.3<br/>Component Library]
        ShadcnUI[Shadcn/UI<br/>Radix UI Components]
        LucideIcons[Lucide React<br/>Icons]
    end
    
    subgraph Backend["Backend & Database"]
        SupabaseJS[@supabase/supabase-js 2.84.0<br/>Client Library]
        SupabaseSSR[@supabase/ssr 0.7.0<br/>Server-side Rendering]
        PostgreSQL[(PostgreSQL<br/>Database)]
        SupabaseStorage[(Supabase Storage<br/>File Storage)]
        SupabaseAuth[(Supabase Auth<br/>Authentication)]
    end
    
    subgraph Utilities["Utilities"]
        ClassVariance[class-variance-authority<br/>Component Variants]
        Clsx[clsx<br/>Conditional Classes]
        TailwindMerge[tailwind-merge<br/>Merge Tailwind Classes]
    end
    
    subgraph DevTools["Development Tools"]
        ESLint[ESLint<br/>Code Linting]
    end
    
    NextJS --> React
    NextJS --> TailwindCSS
    NextJS --> SupabaseSSR
    React --> ShadcnUI
    React --> PrelineUI
    React --> LucideIcons
    ShadcnUI --> ClassVariance
    ShadcnUI --> Clsx
    ShadcnUI --> TailwindMerge
    
    SupabaseJS --> PostgreSQL
    SupabaseJS --> SupabaseStorage
    SupabaseJS --> SupabaseAuth
    SupabaseSSR --> SupabaseJS
    
    style NextJS fill:#e1f5ff
    style React fill:#e1f5ff
    style PostgreSQL fill:#d4edda
    style SupabaseStorage fill:#d4edda
    style SupabaseAuth fill:#d4edda`}
          </div>
        </div>
      </div>
    </div>
  );
}
