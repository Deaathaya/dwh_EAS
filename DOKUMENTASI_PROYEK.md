
## 📋 Daftar Isi
1. [Deskripsi Proyek](#deskripsi-proyek)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Cara Menjalankan](#cara-menjalankan)
6. [Fitur Utama](#fitur-utama)
7. [Queries & Analytics](#queries--analytics)

---

## 🎯 Deskripsi Proyek

Proyek ini mengimplementasikan sebuah **Data Warehouse berbasis Star Schema** untuk sebuah toko retail online. Sistem ini memungkinkan:

- **CRUD Data Dimensi**: Mengelola data produk, pelanggan, dan waktu
- **CRUD Data Fakta**: Mengelola data transaksi penjualan
- **Analytics Dashboard**: Visualisasi data dan tren penjualan
- **OLAP Filtering**: Filter berdasarkan kategori produk (operasi SLICE)

---

## 🏗️ Arsitektur Sistem

### Tech Stack
- **Backend**: Node.js + Express.js
- **Database**: SQLite3
- **Frontend**: React + Vite
- **Styling**: CSS3 dengan responsive design

### Struktur Folder
```
.
├── backend/
│   ├── server.js           # Entry point server
│   ├── database.js         # Inisialisasi database
│   ├── routes.js           # API routes
│   └── package.json        # Dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main app component
│   │   ├── App.css         # Main styles
│   │   ├── main.jsx        # React entry point
│   │   └── tabs/           # Tab components
│   │       ├── ProdukTab.jsx
│   │       ├── PelangganTab.jsx
│   │       ├── WaktuTab.jsx
│   │       ├── PenjualanTab.jsx
│   │       └── DashboardTab.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── SQL_QUERIES.sql         # Query dokumentasi
└── DOKUMENTASI_PROYEK.md   # File ini
```

---

## 🗄️ Database Schema

### Star Schema Diagram
```
                    dim_produk
                        |
                        | (1:N)
                        |
fact_penjualan --+-- dim_pelanggan
                 |
                 +-- dim_waktu
```

### Tabel Dimensi

#### dim_produk
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id_produk | INT (PK) | Primary Key |
| kode_produk | VARCHAR(20) | Kode unik produk |
| nama_produk | VARCHAR(100) | Nama produk |
| kategori | VARCHAR(50) | Elektronik, Pakaian, Makanan, Aksesoris |
| harga | DECIMAL(10,2) | Harga saat ini |

#### dim_pelanggan
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id_pelanggan | INT (PK) | Primary Key |
| kode_pelanggan | VARCHAR(20) | Kode unik pelanggan |
| nama_pelanggan | VARCHAR(100) | Nama lengkap |
| jenis_kelamin | ENUM('L','P') | Laki-laki/Perempuan |
| kota | VARCHAR(50) | Kota domisili |

#### dim_waktu
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id_waktu | INT (PK) | Primary Key |
| tanggal | DATE | Tanggal transaksi |
| tahun | INT | Tahun (2023-2025) |
| bulan | INT | Bulan (1-12) |
| bulan_nama | VARCHAR(20) | Nama bulan |
| kuartal | INT | Kuartal (1-4) |

### Tabel Fakta

#### fact_penjualan
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id_penjualan | INT (PK) | Primary Key |
| id_produk | INT (FK) | Reference ke dim_produk |
| id_pelanggan | INT (FK) | Reference ke dim_pelanggan |
| id_waktu | INT (FK) | Reference ke dim_waktu |
| jumlah | INT | Jumlah unit |
| harga_satuan | DECIMAL(10,2) | Harga per unit |
| total_harga | DECIMAL(10,2) | Jumlah × Harga_satuan |

---

## 🔌 API Endpoints

### Dimensi Produk
```
GET    /api/produk              - Ambil semua produk
POST   /api/produk              - Tambah produk baru
PUT    /api/produk/:id          - Update produk
DELETE /api/produk/:id          - Hapus produk
```

### Dimensi Pelanggan
```
GET    /api/pelanggan           - Ambil semua pelanggan
POST   /api/pelanggan           - Tambah pelanggan baru
PUT    /api/pelanggan/:id       - Update pelanggan
DELETE /api/pelanggan/:id       - Hapus pelanggan
```

### Dimensi Waktu
```
GET    /api/waktu               - Ambil semua tanggal
POST   /api/waktu               - Tambah tanggal baru
DELETE /api/waktu/:id           - Hapus tanggal
```

### Fakta Penjualan
```
GET    /api/penjualan           - Ambil semua transaksi
POST   /api/penjualan           - Tambah transaksi baru
PUT    /api/penjualan/:id       - Update transaksi
DELETE /api/penjualan/:id       - Hapus transaksi
```

### Analytics Queries
```
GET    /api/query/penjualan-per-produk?kategori=Elektronik
       - Total penjualan per produk (dengan optional filter kategori)
       
GET    /api/query/tren-per-bulan?kategori=Pakaian
       - Tren penjualan per bulan (dengan optional filter kategori)
       
GET    /api/query/pelanggan-tertinggi?kategori=Makanan
       - Pelanggan dengan belanja tertinggi (dengan optional filter kategori)
       
GET    /api/kategori
       - Ambil daftar kategori produk
```

---

## 🚀 Cara Menjalankan

### Prerequisite
- Node.js v16+
- npm atau yarn

### Setup & Running

1. **Install Dependencies**
```bash
cd backend && npm install
cd ../frontend && npm install
cd ..
```

2. **Jalankan Backend** (Terminal 1)
```bash
cd backend
npm run dev
# Backend akan berjalan di http://localhost:3000
```

3. **Jalankan Frontend** (Terminal 2)
```bash
cd frontend
npm run dev
# Frontend akan berjalan di http://localhost:5173
```

4. **Akses Aplikasi**
- Buka browser ke `http://localhost:5173`
- Aplikasi akan terhubung otomatis ke backend

---

## ✨ Fitur Utama

### 1️⃣ Tab Dashboard
- **Visualisasi Data**: 3 chart interaktif
  - Total penjualan per produk (bar chart)
  - Tren penjualan per bulan (bar chart)
  - Pelanggan dengan belanja tertinggi (bar chart)
- **OLAP Filtering**: Filter kategori produk yang mengubah semua visualisasi secara real-time
- **Detail Tables**: Tabel detail untuk setiap query

### 2️⃣ Tab Produk (Dimensi)
- ✅ Tambah produk baru
- ✅ Edit produk yang ada
- ✅ Hapus produk
- ✅ Tabel daftar produk lengkap

**Form Fields**:
- Kode Produk (unik)
- Nama Produk
- Kategori (Elektronik, Pakaian, Makanan, Aksesoris)
- Harga

### 3️⃣ Tab Pelanggan (Dimensi)
- ✅ Tambah pelanggan baru
- ✅ Edit pelanggan
- ✅ Hapus pelanggan
- ✅ Tabel daftar pelanggan

**Form Fields**:
- Kode Pelanggan (unik)
- Nama Pelanggan
- Jenis Kelamin (L/P)
- Kota

### 4️⃣ Tab Waktu (Dimensi)
- ✅ Tambah tanggal baru
- ✅ Otomatis generate tahun, bulan, kuartal
- ✅ Hapus tanggal
- ✅ Tabel daftar tanggal

**Features**:
- Hanya input tanggal, sistem auto-generate dimensi waktu lainnya

### 5️⃣ Tab Penjualan (Fakta)
- ✅ Tambah transaksi baru
- ✅ Edit transaksi
- ✅ Hapus transaksi
- ✅ Auto-calculate total harga

**Form Fields**:
- Pilih Produk (dropdown dengan harga)
- Pilih Pelanggan (dropdown)
- Pilih Tanggal (dropdown)
- Jumlah Unit
- Harga Satuan (auto-filled dari produk)
- Total Harga (auto-calculate)

---

## 📊 Queries & Analytics

### Query 1: Total Penjualan Per Produk
**Tujuan**: Membandingkan performa setiap produk
```sql
SELECT 
    dp.nama_produk, 
    SUM(fp.jumlah) as total_terjual, 
    SUM(fp.total_harga) as total_pendapatan
FROM fact_penjualan fp
JOIN dim_produk dp ON fp.id_produk = dp.id_produk
WHERE dp.kategori = ? (optional)
GROUP BY dp.id_produk, dp.nama_produk
ORDER BY total_pendapatan DESC;
```

**Output**:
- nama_produk
- total_terjual (unit)
- total_pendapatan (Rp)

### Query 2: Tren Penjualan Per Bulan
**Tujuan**: Melihat pola penjualan sepanjang waktu
```sql
SELECT 
    dw.bulan_nama, 
    SUM(fp.total_harga) as total_pendapatan
FROM fact_penjualan fp
JOIN dim_waktu dw ON fp.id_waktu = dw.id_waktu
WHERE dp.kategori = ? (optional)
GROUP BY dw.bulan, dw.bulan_nama
ORDER BY dw.bulan;
```

**Output**:
- bulan_nama
- total_pendapatan (Rp)

### Query 3: Pelanggan dengan Belanja Tertinggi
**Tujuan**: Identifikasi top customers
```sql
SELECT 
    dpl.nama_pelanggan, 
    SUM(fp.total_harga) as total_belanja, 
    COUNT(fp.id_penjualan) as jumlah_transaksi
FROM fact_penjualan fp
JOIN dim_pelanggan dpl ON fp.id_pelanggan = dpl.id_pelanggan
WHERE dp.kategori = ? (optional)
GROUP BY dpl.id_pelanggan, dpl.nama_pelanggan
ORDER BY total_belanja DESC;
```

**Output**:
- nama_pelanggan
- total_belanja (Rp)
- jumlah_transaksi

### OLAP Operations (Slice)
Aplikasi mendukung operasi **SLICE** pada dimensi kategori:
- Filter dropdown untuk memilih kategori: Elektronik, Pakaian, Makanan, Aksesoris
- Semua visualisasi dan query akan di-filter berdasarkan kategori yang dipilih
- Default: Semua kategori

---

## 📈 Contoh Data Sample

### Dim Produk (5 records)
| ID | Kode | Nama | Kategori | Harga |
|---|---|---|---|---|
| 1 | PROD001 | Laptop Asus | Elektronik | 8,500,000 |
| 2 | PROD002 | Mouse Logitech | Elektronik | 250,000 |
| 3 | PROD003 | Keyboard Mechanical | Elektronik | 750,000 |
| 4 | PROD004 | T-Shirt Cotton | Pakaian | 150,000 |
| 5 | PROD005 | Jaket Denim | Pakaian | 500,000 |

### Dim Pelanggan (5 records)
| ID | Kode | Nama | Gender | Kota |
|---|---|---|---|---|
| 1 | CUST001 | Budi Santoso | L | Jakarta |
| 2 | CUST002 | Siti Aisyah | P | Surabaya |
| 3 | CUST003 | Agus Wijaya | L | Bandung |
| 4 | CUST004 | Rina Kusuma | P | Medan |
| 5 | CUST005 | Bambang Hermanto | L | Yogyakarta |

### Dim Waktu (5 records)
| ID | Tanggal | Tahun | Bulan | Bulan Nama | Kuartal |
|---|---|---|---|---|---|
| 1 | 2025-01-15 | 2025 | 1 | Januari | 1 |
| 2 | 2025-02-20 | 2025 | 2 | Februari | 1 |
| 3 | 2025-03-10 | 2025 | 3 | Maret | 1 |
| 4 | 2025-04-05 | 2025 | 4 | April | 2 |
| 5 | 2025-05-30 | 2025 | 5 | Mei | 2 |

### Fact Penjualan (10 records)
Pre-populated dengan data sample untuk demonstrasi

---

## 🎨 UI/UX Features

### Responsive Design
- Desktop: Full layout dengan grid
- Tablet: Adjusted layout
- Mobile: Single column, full width

### User Experience
- **Toast Notifications**: Success/Error messages
- **Confirmation Dialogs**: Sebelum delete
- **Inline Editing**: Edit langsung dari tabel
- **Form Validation**: Input validation
- **Auto-calculation**: Total harga otomatis
- **Currency Formatting**: Format Rupiah

### Color Scheme
- Primary: Purple gradient (#667eea - #764ba2)
- Background: Light gray (#f5f5f5)
- Text: Dark gray (#333)
- Accents: Green (#51cf66), Red (#ff6b6b)

---

## 📝 Catatan Penting

### Data Integrity
- Foreign keys diterapkan untuk menjaga referential integrity
- Unique constraint pada kode_produk dan kode_pelanggan
- Auto-increment untuk primary keys

### Performance
- SQLite cukup untuk skala kecil-menengah
- Queries dioptimalkan dengan JOIN
- Indexing otomatis pada primary keys

### Error Handling
- Try-catch di setiap API endpoint
- User-friendly error messages
- Database error logging

---

## 🔐 Keamanan

- CORS enabled untuk development
- JSON validation pada request body
- SQL injection prevention (parameterized queries)
- Input validation pada frontend dan backend

---

## 📦 Database File
Database SQLite disimpan di: `backend/data_warehouse.db`
- Auto-created saat pertama kali backend dijalankan
- Contains semua data sesuai dengan sample data

---

## 🚨 Troubleshooting

### Backend tidak konek ke frontend
- Pastikan backend berjalan di port 3000
- Check CORS configuration di server.js
- Verify API endpoints di browser console

### Database error
- Delete `backend/data_warehouse.db`
- Restart backend untuk re-create database

### Frontend tidak load
- Pastikan frontend berjalan di port 5173
- Check Vite configuration
- Clear browser cache

**Last Updated**: Juni 2026  
**Status**: ✅ Complete & Ready for Submission
