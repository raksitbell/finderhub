# 🔍 Lost & Found System (ระบบจัดการของหายประจำอาคาร)

![Project Wordmark](./assets/images/FinderHub.png)

เว็บไซต์สำหรับประกาศตามหาและแจ้งคืนสิ่งของที่สูญหายภายในอาคาร พัฒนาโดยใช้ **HTML, CSS และ JavaScript** โดยไม่พึ่งพา Framework หรือ Library ภายนอก

---

## 📋 เกี่ยวกับโปรเจกต์ (About)

โปรเจกต์นี้จำลองระบบการจัดการของหาย (Lost and Found) โดยแบ่งการทำงานเป็น 2 ส่วนหลัก:

1. **User Side (บุคคลทั่วไป):** สามารถค้นหา, ดูรายการของที่พบ และดูสถานะของสิ่งของได้
2. **Admin Side (เจ้าหน้าที่):** ระบบจัดการหลังบ้าน (Dashboard) สำหรับเพิ่มรายการของ แก้ไขสถานะ (Found/Returned) และลบรายการ

**💡 ข้อมูลเชิงเทคนิค:**

- **Zero Dependencies:** เขียนด้วย HTML/CSS/JS แบบไม่ใช้ Framework/Library
- **Mock Database:** ใช้ `localStorage` ในการจำลองฐานข้อมูล ทำให้ข้อมูลยังอยู่แม้กด Refresh
- **Mock Authentication:** จำลองระบบ Login/Logout และ Session ด้วย `sessionStorage`
- **Component-based:** ใช้ JavaScript สร้าง HTML Component (Card, Navbar) เพื่อลดการเขียนโค้ดซ้ำซ้อน

---

## 🚀 วิธีการติดตั้งและใช้งาน (Installation & Usage)

เนื่องจากเป็น Static Web สามารถเปิดใช้งานได้ทันทีโดยไม่ต้องติดตั้ง Server

1. Clone หรือ Download โปรเจกต์นี้
2. เปิดไฟล์ `index.html` บน Browser (แนะนำ Chrome หรือ Edge)
3. _แนะนำ:_ หากใช้ VS Code แนะนำให้เปิดผ่าน **Live Server** เพื่อการทำงานที่สมบูรณ์ที่สุด

---

## 🔐 ข้อมูลสำหรับเข้าสู่ระบบ (Admin Credentials)

สำหรับเข้าใช้งานส่วนเจ้าหน้าที่ (`/auth/login.html`) เพื่อจัดการข้อมูล

| Role      | Username | Password    |
| :-------- | :------- | :---------- |
| **Admin** | `admin`  | `admin1234` |

> **หมายเหตุ:** รหัสผ่านนี้ถูกกำหนดไว้ในไฟล์ `assets/js/modules/auth.js` สามารถแก้ไขได้

---

## ✨ ฟีเจอร์หลัก (Features)

### 👤 ฝั่งผู้ใช้งาน (User)

- **Search & Filter:** ค้นหาของหายจากชื่อ, สถานที่, หรือหมวดหมู่
- **Item Detail:** ดูรายละเอียดของสิ่งของ ภาพถ่าย และสถานที่ติดต่อรับคืน
- **Found Item Info:** ดูข้อมูลขั้นตอนการแจ้งพบทรัพย์สิน (สำหรับผู้ที่เก็บของได้)

### 🛠 ฝั่งเจ้าหน้าที่ (Admin)

- **Authentication:** ระบบตรวจสอบสิทธิ์ก่อนเข้าใช้งาน
- **Dashboard:** หน้าสรุปภาพรวม พร้อมสถิติจำนวนรายการ (Total, Found, Returned)
- **Item Management:** เพิ่มรายการใหม่ (Add), แก้ไขสถานะ (Update Status), และลบรายการ (Delete)
- **Reset Data:** ปุ่มสำหรับรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น (Mock Data)

---

## 💾 การจัดการข้อมูล (Data Management & CRUD)

ระบบนี้ใช้ **CRUD Operations** ในการจัดการข้อมูลของหาย โดยทำงานร่วมกับ `localStorage` ของ Browser:

1.  **Create (เพิ่มข้อมูล):**
    -   เจ้าหน้าที่สามารถเพิ่มรายการของหายใหม่ผ่านหน้า Dashboard
    -   ระบบจะสร้าง ID ใหม่ให้อัตโนมัติ (ใช้ Timestamp) และบันทึกลงใน Array
2.  **Read (อ่านข้อมูล):**
    -   **User:** ดึงข้อมูลทั้งหมดมาแสดงผลที่หน้าแรก และสามารถกดดูรายละเอียด (Get by ID)
    -   **Admin:** ดึงข้อมูลทั้งหมดมาแสดงในตารางจัดการ
3.  **Update (แก้ไขข้อมูล):**
    -   เจ้าหน้าที่สามารถเปลี่ยนสถานะของสิ่งของจาก "Found" (พบแล้ว) เป็น "Returned" (คืนแล้ว)
    -   ข้อมูลสถานะจะถูกบันทึกทับลงในรายการเดิม
4.  **Delete (ลบข้อมูล):**
    -   เจ้าหน้าที่สามารถลบรายการที่ไม่ต้องการออกจากระบบได้อย่างถาวร

---

## 📂 โครงสร้างไฟล์ (File Structure)

```
│
├── index.html              # หน้าแรก (แสดงรายการของหาย)
├── /auth                   # หน้าสำหรับผู้ดูแลระบบ
│   ├── admin.html          # หน้า Dashboard ของเจ้าหน้าที่
│   └── login.html          # หน้าเข้าสู่ระบบ
│
├── /assets
│   ├── /css
│   │   ├── main.css        # CSS หลัก (Reset, Fonts, Variables)
│   │   ├── components.css  # CSS ของ Card, Button, Navbar
│   │   └── responsive.css  # Media Queries
│   │
│   ├── /js
│   │   ├── app.js          # JS สำหรับหน้า User ทั่วไป (Search, Render)
│   │   ├── admin.js        # JS สำหรับหน้า Admin (Dashboard logic)
│   │   ├── login.js        # JS สำหรับหน้า Login
│   │   └── /modules        # โมดูลย่อย
│   │       ├── data.js     # (สำคัญ) ไฟล์เก็บข้อมูล Mock Data
│   │       └── auth.js     # Auth Logic (Login/Logout/Check)
│   │
│   └── /images             # รูปภาพประกอบและรูปสินค้าตัวอย่าง
│
└── README.md               # คู่มือการรันโปรเจกต์
```
