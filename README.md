# Data Warehouse Dashboard

Dashboard penjualan untuk menganalisis tren, produk, dan pelanggan dengan visualisasi data real-time. Buat dengan React + Node.js + SQLite.

## 🚀 Quick Start

Pastikan kamu punya:
- **PHP 8.1+**
- **MySQL 5.7+** (atau MariaDB)
- **Node.js 16+**
- **Composer** untuk PHP

### 1. Setup Database

Buat database baru di MySQL:
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS data_warehouse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Atau pake MySQL GUI (phpMyAdmin, WorkBench, dll) dan create database `data_warehouse`.

### 2. Setup Backend

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
```

Ini akan:
- Install PHP dependencies
- Generate APP_KEY
- Create semua tabel di database
- Populate sample data

### 3. Jalankan Backend (Terminal 1)

```bash
cd backend
php artisan serve
```

Backend bakal jalan di `http://localhost:8000` (atau lihat di terminal)

### 4. Setup & Jalankan Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Frontend bakal buka otomatis atau buka manual `http://localhost:5173`

### 5. Done!

Aplikasi sudah ready. Coba aja semua fitur di dashboard.

---

## 📊 Apa Aja Fitur yang Ada?

### Dashboard
- 3 chart buat lihat total penjualan, tren bulanan, sama top customers
- Filter kategori produk yang langsung update semua chart
- Tabel detail buat setiap data

### Kelola Data
- **Produk**: Tambah, edit, hapus produk dengan harga dan kategori
- **Pelanggan**: Atur data pelanggan (nama, kota, dll)
- **Tanggal**: Input tanggal, sistem auto-generate bulan, tahun, quarter
- **Penjualan**: Catat transaksi penjualan dengan auto-calculate total

---

## 🗂️ Struktur Folder

```
.
├── backend/              # API & Database
│   ├── server.js        # Server utama
│   ├── database.js      # Setup database
│   ├── routes.js        # API endpoints
│   └── package.json
│
├── frontend/            # UI
│   ├── src/
│   │   ├── App.jsx      # Main app
│   │   ├── App.css      # Styles
│   │   └── tabs/        # Tab components
│   │       ├── DashboardTab.jsx
│   │       ├── ProdukTab.jsx
│   │       ├── PelangganTab.jsx
│   │       ├── WaktuTab.jsx
│   │       └── PenjualanTab.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md            # File ini
```

---

## 🗄️ Database Integration

Backend pakai **Laravel** dengan **MySQL**. Semua database setup udah otomatis dengan command di atas.

### Struktur Database (Star Schema)

**Tabel Dimensi:**
- `produk` - Data produk (elektronik, pakaian, dll)
- `pelanggan` - Data pelanggan (nama, kota, gender)
- `waktu` - Data tanggal/waktu (tahun, bulan, kuartal)

**Tabel Fakta:**
- `penjualans` - Data transaksi penjualan (foreign keys ke semua dimensi)

Foreign keys udah di-set, jadi ngga bisa delete dimensi yang masih dipake di transaksi.

### Database Configuration

Konfigurasi database ada di file `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=data_warehouse
DB_USERNAME=root
DB_PASSWORD=
```

Kalo kamu pake password MySQL yang beda, edit `DB_PASSWORD=` dengan password kamu.

### Migrations & Seeding

Database table di-create otomatis lewat Laravel migrations:
- Migrations ada di `backend/database/migrations/`
- Sample data di-seed lewat `backend/database/seeders/`

Kalo mau reset database:
```bash
cd backend
php artisan migrate:fresh --seed
```

Ini bakal hapus semua tabel dan buat ulang dengan sample data baru.

### Verify Database Connection

Kalo mau check database status:
```bash
cd backend
php artisan tinker
```

Terus di console ketik:
```php
Produk::count()  // Cek jumlah produk
Pelanggan::count()  // Cek jumlah pelanggan
Penjualan::count()  // Cek jumlah transaksi
```

Kalo semua return angka > 0, database connection aman!

---

## 🔌 API Endpoints

Backend adalah API REST yang built-in dengan Laravel. Semua endpoint ada prefix `/api`.

### Health Check
```
GET /api/health
```
Buat check apakah backend running dan database connected.

### CRUD Endpoints

**Produk:**
- `GET /api/produk` - Ambil semua produk
- `POST /api/produk` - Tambah produk baru
- `PUT /api/produk/{id}` - Update produk
- `DELETE /api/produk/{id}` - Hapus produk

**Pelanggan:**
- `GET /api/pelanggan` - Ambil semua pelanggan
- `POST /api/pelanggan` - Tambah pelanggan baru
- `PUT /api/pelanggan/{id}` - Update pelanggan
- `DELETE /api/pelanggan/{id}` - Hapus pelanggan

**Waktu:**
- `GET /api/waktu` - Ambil semua tanggal
- `POST /api/waktu` - Tambah tanggal baru
- `DELETE /api/waktu/{id}` - Hapus tanggal

**Penjualan:**
- `GET /api/penjualan` - Ambil semua transaksi
- `POST /api/penjualan` - Tambah transaksi baru
- `PUT /api/penjualan/{id}` - Update transaksi
- `DELETE /api/penjualan/{id}` - Hapus transaksi

### Analytics Endpoints

```
GET /api/kategori
```
Ambil daftar semua kategori produk yang tersedia.

```
GET /api/query/penjualan-per-produk?kategori=Elektronik
```
Total penjualan per produk. Filter kategori optional.

```
GET /api/query/tren-per-bulan?kategori=Pakaian
```
Tren penjualan per bulan. Filter kategori optional.

```
GET /api/query/pelanggan-tertinggi?kategori=Makanan
```
Daftar pelanggan dengan belanja tertinggi. Filter kategori optional.

---

## 🆘 Troubleshooting

### MySQL tidak running
**Gejala**: `SQLSTATE[HY000] [2002] Connection refused`

**Solusi**:
- Mac: `mysql.server start`
- Windows: Start "MySQL80" service di Services
- Linux: `sudo systemctl start mysql`
- Atau buka XAMPP/phpMyAdmin dan start MySQL dari sana

### Database error / tidak connect
**Gejala**: `Base table or view not found` atau error saat `php artisan migrate`

**Solusi**:
```bash
cd backend
php artisan migrate:fresh --seed
```

Ini akan reset semua tabel dan populate data baru.

### Error saat composer install
**Gejala**: `composer not found` atau permission error

**Solusi**:
- Install Composer dari https://getcomposer.org
- Mac/Linux: `curl -sS https://getcomposer.org/installer | php`
- Windows: Download installer executable

### Frontend blank atau error di console
**Gejala**: Dashboard tidak load atau chart tidak tampil

**Solusi**:
1. Pastiin backend running dulu (`php artisan serve`)
2. Cek browser console (F12) buat error message
3. Verify backend API: buka `http://localhost:8000/api/health` di browser
4. Kalo dapat `{"status":"ok"}`, backend OK
5. Kalo blank/error, check backend terminal untuk error

### CORS Error di browser
**Gejala**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solusi**:
- CORS sudah di-enable di Laravel (`config/cors.php`)
- Pastiin frontend URL bukan `localhost:5173/path/yang/aneh`
- Clear browser cache: Ctrl+Shift+Delete (Chrome) atau Cmd+Shift+Delete (Mac)
- Restart frontend: Kill `npm run dev` dan jalanin ulang

### Frontend port 5173 udah terpakai
**Gejala**: `EADDRINUSE: address already in use :::5173`

**Solusi**:
```bash
# Kill process yang pake port 5173
# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Windows (PowerShell):
netstat -ano | findstr :5173
taskkill /PID [PID] /F
```

Terus jalanin `npm run dev` lagi.

### Backend port 8000 udah terpakai
**Gejala**: `Address already in use`

**Solusi**:
```bash
php artisan serve --port=8001
```

Terus update frontend API URL ke `http://localhost:8001`

---

## 📝 Tech Stack

- **Frontend**: React 18 + Vite + CSS3
- **Backend**: Laravel 11 (PHP 8.1+)
- **Database**: MySQL 5.7+
- **Package Managers**: npm (frontend), Composer (backend)

---

## 🎨 Features

- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Real-time filtering
- ✅ Toast notifications
- ✅ Form validation
- ✅ Auto-calculation (harga)
- ✅ Currency formatting (IDR)
- ✅ Confirmation sebelum delete
- ✅ Chart visualization

---

## 📊 Sample Data

Database uda punya:
- 5 produk (Elektronik + Pakaian)
- 5 pelanggan dari berbagai kota
- 5 data waktu
- 10+ transaksi penjualan

Cukup buat testing semua fitur. Bisa tambah/edit data lewat aplikasi.

---

## 🚀 Development

### Frontend Development

Jalankan dengan hot reload:
```bash
cd frontend
npm run dev
```

Vite automatically reload saat ada perubahan file.

Build production:
```bash
cd frontend
npm run build
```

Output ada di `frontend/dist/`

### Backend Development

Edit file di `backend/app/` dan `backend/routes/`:
- Models ada di `backend/app/Models/`
- Controllers di `backend/app/Http/Controllers/`
- Routes di `backend/routes/api.php`

Terus restart backend (atau pake auto-reload package).

### Testing Database

```bash
cd backend
php artisan tinker
```

Terus jalankan query:
```php
Produk::all()  // Lihat semua produk
Pelanggan::where('nama', 'like', '%Budi%')->get()  // Cari pelanggan
Penjualan::sum('total_harga')  // Total penjualan
```

---

## 📝 Catatan Penting

### Database
- Database auto-create lewat `php artisan migrate` (ngga perlu import SQL file)
- Sample data auto-populate lewat `php artisan db:seed`
- Foreign keys dipaksa, jadi ngga bisa delete dimensi yang masih dipake di transaksi
- Migrations track semua schema changes (aman kalo add column/table nanti)

### Data Validation
- Kode produk harus unique
- Kode pelanggan harus unique
- Tanggal harus valid format date

### Performance
- Untuk data besar (>100K rows), consider add indexing di database
- Frontend chart auto-limit 10 items, sisanya di-truncate
- API queries optimize dengan JOIN dan GROUP BY

### Security
- CORS enabled untuk development
- SQL injection prevention (pakai Eloquent ORM)
- Input validation di backend
- Ngga ada authentication (open API), jadi careful kalo production

---

## 🎯 Checklist Setup

Pastiin semua ini uda done:
- [ ] MySQL running dan bisa di-access
- [ ] Database `data_warehouse` sudah created
- [ ] `cd backend && composer install` berhasil
- [ ] `php artisan migrate` berhasil (check terminal)
- [ ] `php artisan db:seed` berhasil
- [ ] `php artisan serve` berjalan di localhost:8000
- [ ] `cd frontend && npm install` berhasil
- [ ] `npm run dev` berjalan di localhost:5173
- [ ] Dashboard load dan ada data (bukan "Tidak ada data")
- [ ] Bisa filter kategori dan chart update
- [ ] Bisa tambah/edit/hapus data di tab Produk, Pelanggan, dll

---

**Selamat! Aplikasi sudah siap di-explore!**

Ada pertanyaan? Cek file `DOKUMENTASI_PROYEK.md` buat info lebih lengkap tentang arsitektur dan database schema.
