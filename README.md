# 🔍 Lost & Found System (ระบบจัดการของหายประจำอาคาร)

![Project Wordmark](./assets/images/FinderHub.png)

เว็บไซต์สำหรับประกาศตามหาและแจ้งคืนสิ่งของที่สูญหายภายในอาคาร พัฒนาโดยใช้ **HTML, CSS และ JavaScript** โดยไม่พึ่งพา Framework หรือ Library ภายนอก

---

## 📋 เกี่ยวกับโปรเจกต์ (About)
โปรเจกต์นี้จำลองระบบการจัดการของหาย (Lost and Found) โดยแบ่งการทำงานเป็น 2 ส่วนหลัก:
1. **User Side (บุคคลทั่วไป):** สามารถค้นหา, ดูรายการของที่พบ และดูสถานะของสิ่งของได้
2. **Admin Side (เจ้าหน้าที่):** ระบบจัดการหลังบ้าน (Dashboard) สำหรับเพิ่มรายการของ แก้ไขสถานะ (Found/Returned) และลบรายการ

**💡 ข้อมูลเชิงเทคนิค:**
* **Zero Dependencies:** เขียนด้วย HTML/CSS/JS แบบไม่ใช้ Framework/Library
* **Mock Database:** ใช้ `localStorage` ในการจำลองฐานข้อมูล ทำให้ข้อมูลยังอยู่แม้กด Refresh
* **Mock Authentication:** จำลองระบบ Login/Logout และ Session ด้วย `sessionStorage`
* **Component-based:** ใช้ JavaScript สร้าง HTML Component (Card, Navbar) เพื่อลดการเขียนโค้ดซ้ำซ้อน

---

## 🚀 วิธีการติดตั้งและใช้งาน (Installation & Usage)
เนื่องจากเป็น Static Web สามารถเปิดใช้งานได้ทันทีโดยไม่ต้องติดตั้ง Server
1. Clone หรือ Download โปรเจกต์นี้
2. เปิดไฟล์ `index.html` บน Browser (แนะนำ Chrome หรือ Edge)
3. *แนะนำ:* หากใช้ VS Code แนะนำให้เปิดผ่าน **Live Server** เพื่อการทำงานที่สมบูรณ์ที่สุด

---

## 🔐 ข้อมูลสำหรับเข้าสู่ระบบ (Admin Credentials)
สำหรับเข้าใช้งานส่วนเจ้าหน้าที่ (`/login.html`) เพื่อจัดการข้อมูล

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin1234` |

> **หมายเหตุ:** รหัสผ่านนี้ถูกกำหนดไว้ในไฟล์ `assets/js/config.js` สามารถแก้ไขได้

---

## ✨ ฟีเจอร์หลัก (Features)
### 👤 ฝั่งผู้ใช้งาน (User)
* **Search & Filter:** ค้นหาของหายจากชื่อ, สถานที่, หรือหมวดหมู่
* **Item Detail:** ดูรายละเอียดของสิ่งของ ภาพถ่าย และสถานที่ติดต่อรับคืน

### 🛠 ฝั่งเจ้าหน้าที่ (Admin)
* **Authentication:** ระบบตรวจสอบสิทธิ์ก่อนเข้าใช้งาน
* **Dashboard:** ตารางสรุปรายการของหายทั้งหมด
* **Add Item:** ฟอร์มเพิ่มรายการของหาย พร้อมระบุหมวดหมู่และวันที่
* **Update Status:** เปลี่ยนสถานะสิ่งของเมื่อมีเจ้าของมารับคืนแล้ว

---

## 📂 โครงสร้างไฟล์ (File Structure)

```
│
├── index.html              # หน้าแรก (แสดงรายการของหาย)
├── admin.html              # หน้า Dashboard ของเจ้าหน้าที่
├── login.html              # หน้าเข้าสู่ระบบของเจ้าหน้าที่
│
├── /assets
│   ├── /css
│   │   ├── main.css        # CSS หลัก (Fonts, Variables)
│   │
│   ├── /js
│   │   ├── auth.js         # ทำระบบ Login / Logout
│   │   ├── config.js       # เก็บ username และ password
│   │   └── guard.js        # ทำ IIFE สำหรับบังคับเข้าสู่ระบบ
│   │
│   └── /images             # รูปภาพประกอบและรูปสิ่งของ
│
└── README.md               # คู่มือการรันโปรเจกต์```