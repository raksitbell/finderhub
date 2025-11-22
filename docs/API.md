# คู่มือ API ของ FinderHub

**Base URL:** `/api`
**Authentication:** ใช้ Cookies (Supabase Auth) สำหรับการแก้ไขข้อมูล (POST, PUT, DELETE)

## Endpoints

| Method   | Endpoint     | คำอธิบาย                              | Auth |
| :------- | :----------- | :------------------------------------ | :--- |
| `GET`    | `/items`     | ดึงรายการของหายทั้งหมด (ล่าสุดก่อน)   | ❌   |
| `POST`   | `/items`     | เพิ่มรายการใหม่                       | ✅   |
| `GET`    | `/items/:id` | ดูรายละเอียดรายการตาม ID              | ❌   |
| `PUT`    | `/items/:id` | อัปเดตข้อมูลรายการ (เช่น แจ้งคืนแล้ว) | ✅   |
| `DELETE` | `/items/:id` | ลบรายการ                              | ✅   |

## Data Schemas

### Item Object

```json
{
  "id": "number",
  "name": "string",
  "category": "string (e.g., it_gadget)",
  "date": "number (timestamp)",
  "location": "string",
  "status": "boolean (true=Found, false=Returned)",
  "image": "string (url)"
}
```
