# PAG | Pro Audio Gadgets — Store

Web app สำหรับลูกค้าตรวจสอบราคาและสต็อกสินค้า (Realtime)

## 🚀 วิธีเริ่มต้น

### 1. ตั้งค่า Supabase

1. ไปที่ [supabase.com](https://supabase.com) แล้วสร้าง Project ใหม่
2. ไปที่ **SQL Editor** แล้ว copy + paste ทั้งหมดจากไฟล์ `supabase-setup.sql` แล้วกด **Run**
3. ไปที่ **Project Settings > API** แล้วเอา URL และ anon key

### 2. ตั้งค่า Environment Variables

แก้ไฟล์ `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. สร้าง Admin User ใน Supabase

ไปที่ **Authentication > Users > Add User** แล้วสร้าง email/password สำหรับ admin

### 4. รัน Development Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

---

## 📱 หน้าต่างๆ

| URL | คำอธิบาย |
|-----|----------|
| `/` | หน้าลูกค้า — ดูสินค้า ราคา และสต็อก Realtime |
| `/admin` | Admin Panel — จัดการจำนวนสต็อก |
| `/admin/login` | Login สำหรับ Admin |

## ✨ Features

- 🟢 **Realtime Stock** — สต็อกอัปเดตทันทีเมื่อ Admin แก้ไข (ไม่ต้อง refresh)
- 🔍 **Search & Filter** — ค้นหาสินค้าและกรองตามหมวดหมู่
- 📊 **Stock Status** — แสดงสถานะ มีสินค้า / เหลือน้อย / หมด
- 🔐 **Admin Auth** — ระบบ Login ด้วย Supabase Auth
- ➕➖ **Stock Management** — กด + / - เพื่อเพิ่ม/ลดสต็อกได้ทันที
