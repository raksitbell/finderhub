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
- ✨ **ตัวช่วยเพิ่มรายการ (Add Item Wizard)**: ระบบ Wizard 2 ขั้นตอน (กรอกข้อมูล -> ตรวจสอบ) พร้อม **Instant Preview** แสดงรูปภาพทันทีโดยไม่ต้องรออัปโหลด
- 🏷️ **ติดตามสถานะ (Status Tracking)**: ติดตามสถานะสิ่งของว่าเป็น "พบแล้ว" (Found) หรือ "คืนแล้ว" (Returned)
- 📝 **จัดการการรับคืน (Claim Management)**: บันทึกข้อมูลผู้มารับของคืน (ชื่อ, เบอร์โทร)
- ⚙️ **จัดการข้อมูล (CRUD Operations)**: เพิ่ม ลบ และแก้ไขสถานะรายการ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| หมวดหมู่          | เทคโนโลยี                                                                                                                                                                                               | รายละเอียด                                           |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------- |
| **Framework**     | ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)                                                                                                   | React Framework สำหรับเว็บแอปพลิเคชัน                |
| **Styling**       | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)                                                                                   | Utility-first CSS framework                          |
| **UI Components** | ![Preline UI](https://img.shields.io/badge/Preline_UI-blue?style=flat-square) ![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-000000?style=flat-square&logo=shadcnui&logoColor=white)               | Component Library ที่สวยงามและเข้าถึงง่าย            |
| **Icons**         | ![Lucide React](https://img.shields.io/badge/Lucide_React-F7DF1E?style=flat-square&logo=javascript&logoColor=black)                                                                                     | ชุดไอคอนที่ทันสมัย                                   |
| **Fonts**         | **Google Fonts** (Inter, Kanit)                                                                                                                                                                         | ใช้ฟอนต์ Inter และ Kanit (โหลดผ่าน Google Fonts CDN) |
| **Database**      | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)                                                                                               | Backend-as-a-Service (Database, Auth, Storage)       |
| **DevOps**        | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Version Control & Deployment Platform                |

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```
src/
├── 📂 app/                 # เส้นทางหน้าเว็บและเลย์เอาต์
│   ├── 📄 layout.js        # พื้นที่เก็บชุดคำสั่งระดับหัว (เรียกใช้สคริปต์, เรียกใช้บริการ (CDN))
│   ├── 📄 page.jsx         # เส้นทางหน้าแรกสาธารณะ (ตารางรายการของหาย)
│   ├── 📂 admin/           # เส้นทางที่ได้รับการป้องกันสำหรับผู้ดูแลระบบ
│   ├── 📂 dev/             # 🆕 Developer Portal (เอกสาร & Sitemap)
│   └── 📂 login/           # เส้นทางการยืนยันตัวตน
├── 📂 components/          # คอมโพเนนต์ React
│   ├── 📂 admin/           # คอมโพเนนต์เฉพาะสำหรับ Admin (ตาราง, ส่วนหัว)
│   ├── 📂 common/          # คอมโพเนนต์ทั่วไป (PrelineScript)
│   ├── 📂 items/           # คอมโพเนนต์เกี่ยวกับรายการ (ItemCard)
│   ├── 📂 layout/          # โครงสร้างหลัก (Navbar, Footer)
│   ├── 📂 modals/          # กล่องโต้ตอบ (Dialogs) และวิซาร์ด (Wizards)
│   └── 📂 ui/              # องค์ประกอบ UI พื้นฐานที่ใช้ซ้ำได้ (ปุ่ม, ช่องกรอกข้อมูล)
├── 📂 hooks/               # React Hooks แบบกำหนดเอง (ตรรกะของระบบ)
├── 📂 lib/                 # ยูทิลิตี้, ไคลเอนต์ API, และการเชื่อมต่อฐานข้อมูล
│   ├── 📄 data.js          # Data Access Object (DAO)
│   ├── 📄 docs.js          # 🆕 Markdown Parser สำหรับ Docs
│   └── 📄 supabase.js      # Supabase Client Initialization
└── 📂 scripts/             # สคริปต์สำหรับการบำรุงรักษาและการตั้งค่า
```

---

## 📖 วิธีการใช้งาน (How to Use)

> สำหรับคู่มือการใช้งานอย่างละเอียดพร้อมภาพประกอบ สามารถดูได้ที่ [คู่มือการใช้งาน (Tutorial)](docs/TUTORIAL.th.md)

### 1. 👤 สำหรับผู้ใช้งานทั่วไป

- **ค้นหาของหาย**: ใช้ช่องค้นหาหรือตัวกรองหมวดหมู่หน้าแรก
- **แจ้งพบของหาย**: กดปุ่ม "แจ้งพบของหาย" มุมขวาบน > ถ่ายรูป > กรอกรายละเอียด
- **ดูรายละเอียด**: คลิกที่รายการเพื่อดูข้อมูลและวิธีการรับคืน

### 2. 🛡️ สำหรับผู้ดูแลระบบ

- **จัดการรายการ**: เพิ่มรายการใหม่ผ่านปุ่ม "+ เพิ่มรายการ"
- **คืนของ**: คลิกที่รายการ > กด "ยืนยันการคืน" > กรอกข้อมูลผู้รับ
- **ลบรายการ**: คลิกที่รายการ > กด "ลบรายการ"

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
    > **💡 ระบบอัจฉริยะ:** คำสั่งนี้จะตรวจสอบไฟล์ `.env` และการเชื่อมต่อ Supabase ให้โดยอัตโนมัติ
    >
    > **หากพบปัญหา Port หรือ Lock file:** ให้ใช้คำสั่ง `npm run dev:clean` เพื่อล้างค่าและเริ่มใหม่
4.  **เปิดเบราว์เซอร์**:
    ไปที่ `http://localhost:3000`

---

## 🔐 ความปลอดภัย (Security)

หากคุณพบช่องโหว่ด้านความปลอดภัย โปรดดูนโยบายและวิธีการรายงานได้ที่ [นโยบายความปลอดภัย (Security Policy)](docs/SECURITY.md)

---

## 📖 เอกสารประกอบ (Documentation)

สำหรับเอกสารทางเทคนิคและคู่มือสำหรับนักพัฒนา สามารถเข้าถึงได้ที่ **[Developer Portal](/dev)** หรือดูไฟล์ต้นฉบับได้ที่:

- [เอกสารสำหรับนักพัฒนา (Development Guide)](docs/DEVELOPMENT.th.md)
- [เจาะลึกทางเทคนิค (Technical Deep Dive)](docs/TECH.md)
- [บันทึกการเปลี่ยนแปลง (Changelog)](docs/CHANGELOG.th.md)
