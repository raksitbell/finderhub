# 🔎 FinderHub - ระบบจัดการของหาย (Lost & Found)

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.en.md)

> **FinderHub** เป็นเว็บแอปพลิเคชันที่ออกแบบมาให้ผู้ใช้สามารถรับทรัพย์สินที่ทำสูญหายไว้คืนได้เมื่อมีผู้พบเจอนำส่งผู้ดูแล

---

## 🚀 ฟีเจอร์หลัก (Key Features)

### 👥 สำหรับผู้ใช้งานทั่วไป (Public Interface)

- 🔍 **ค้นหาและกรอง (Smart Search)**: แถบค้นหาและตัวกรองหมวดหมู่ที่มีประสิทธิภาพเพื่อค้นหาสิ่งของได้อย่างรวดเร็ว
- 📄 **รายละเอียดสิ่งของ (Item Details)**: แสดงรายละเอียดของสิ่งที่พบ เช่น สถานที่ วันที่ และคำอธิบาย พร้อมรูปภาพที่ชัดเจน
- 📢 **แจ้งของที่พบ (Report Found Items)**: วิธีการแจ้งของที่พบ
- 📱 **รองรับทุกอุปกรณ์ (Responsive Design)**: ใช้งานได้ดีทั้งบนคอมพิวเตอร์และมือถือ
- ⚡ **โหลดข้อมูลลื่นไหล (Smooth Loading)**: มีระบบ Skeleton Screen และการโหลดรูปภาพที่ปรับปรุงแล้วเพื่อประสบการณ์ที่ดี

### 🛡️ แดชบอร์ดผู้ดูแลระบบ (Admin Dashboard)

- 📊 **จัดการคลังข้อมูล (Inventory Management)**: ดูรายการทั้งหมดในรูปแบบตารางหรือการ์ด (บนมือถือ)
- ✨ **ตัวช่วยเพิ่มรายการ (Add Item Wizard)**: ระบบ Wizard 2 ขั้นตอน (กรอกข้อมูล -> ตรวจสอบ) เพื่อเพิ่มรายการใหม่
- 🏷️ **ติดตามสถานะ (Status Tracking)**: ติดตามสถานะสิ่งของว่าเป็น "พบแล้ว" (Found) หรือ "คืนแล้ว" (Returned)
- 📝 **จัดการการรับคืน (Claim Management)**: บันทึกข้อมูลผู้มารับของคืน (ชื่อ, เบอร์โทร)
- ⚙️ **จัดการข้อมูล (CRUD Operations)**: เพิ่ม ลบ และแก้ไขสถานะรายการ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| หมวดหมู่          | เทคโนโลยี                                                                                                                                                                                 | รายละเอียด                                |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| **Framework**     | ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)                                                                                     | React Framework สำหรับเว็บแอปพลิเคชัน     |
| **Styling**       | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)                                                                     | Utility-first CSS framework               |
| **UI Components** | ![Preline UI](https://img.shields.io/badge/Preline_UI-blue?style=flat-square) ![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-000000?style=flat-square&logo=shadcnui&logoColor=white) | Component Library ที่สวยงามและเข้าถึงง่าย |
| **Icons**         | ![Lucide React](https://img.shields.io/badge/Lucide_React-F7DF1E?style=flat-square&logo=javascript&logoColor=black)                                                                       | ชุดไอคอนที่ทันสมัย                        |
| **Fonts**         | **Google Fonts** (Inter, Kanit)                                                                                                                                                           | ใช้ฟอนต์ Inter และ Kanit (โหลดผ่าน Google Fonts CDN) |

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```
src/
├── app/                 # หน้าเว็บ Next.js App Router
├── components/          # UI Components ที่ใช้ซ้ำได้
│   ├── admin/           # Components สำหรับ Admin (Table, Filters, Header)
│   ├── modals/          # Components กล่องข้อความ (ItemModal, FoundItemModal)
│   │   └── admin/       # Components สำหรับ Admin Modal (AddItemModal, AdminItemModal)
│   ├── ui/              # UI พื้นฐาน (Button, Input, Select, LoadingScreen)
│   ├── KeyMetrics.jsx   # Component แสดงสถิติ
│   └── ...
├── hooks/               # Custom React hooks (useItems, useItemFilter, useAdminDashboard)
├── lib/                 # ฟังก์ชัน Utility
└── scripts/             # สคริปต์สำหรับตั้งค่าระบบ
```

---

## ⚡ การเริ่มต้นใช้งาน (Getting Started)

1.  **Clone repository**:
    ```bash
    git clone https://github.com/raksitbell/finderhub.git
    ```
2.  **ติดตั้ง dependencies**:
    ```bash
    npm install
    ```
3.  **รันเซิร์ฟเวอร์สำหรับพัฒนา**:
    ```bash
    npm run dev
    ```
    > **💡 หมายเหตุ:** หากคุณยังไม่มีไฟล์ `.env` ระบบจะแจ้งให้คุณกรอก **Supabase URL** และ **Anon Key** เพื่อสร้างไฟล์ให้โดยอัตโนมัติ
4.  **เปิดเบราว์เซอร์**:
    ไปที่ `URL:3000`

---

## 📖 เอกสารประกอบ (Documentation)

สำหรับคู่มือรายละเอียดเกี่ยวกับโครงสร้างโค้ดและการทำงานของ Component ต่างๆ โปรดดูที่ [เอกสารสำหรับนักพัฒนา](docs/DEVELOPMENT.th.md)
