-- =====================================================
-- DATA WAREHOUSE - STAR SCHEMA
-- Toko Retail Online
-- =====================================================

-- =====================================================
-- SCHEMA SETUP
-- =====================================================

-- Dimension: Produk
CREATE TABLE dim_produk (
    id_produk INTEGER PRIMARY KEY AUTOINCREMENT,
    kode_produk TEXT UNIQUE NOT NULL,
    nama_produk TEXT NOT NULL,
    kategori TEXT NOT NULL,
    harga DECIMAL(10,2) NOT NULL
);

-- Dimension: Pelanggan
CREATE TABLE dim_pelanggan (
    id_pelanggan INTEGER PRIMARY KEY AUTOINCREMENT,
    kode_pelanggan TEXT UNIQUE NOT NULL,
    nama_pelanggan TEXT NOT NULL,
    jenis_kelamin TEXT CHECK(jenis_kelamin IN ('L', 'P')),
    kota TEXT NOT NULL
);

-- Dimension: Waktu
CREATE TABLE dim_waktu (
    id_waktu INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE UNIQUE NOT NULL,
    tahun INTEGER NOT NULL,
    bulan INTEGER NOT NULL,
    bulan_nama TEXT NOT NULL,
    kuartal INTEGER NOT NULL
);

-- Fact: Penjualan
CREATE TABLE fact_penjualan (
    id_penjualan INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produk INTEGER NOT NULL,
    id_pelanggan INTEGER NOT NULL,
    id_waktu INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL,
    total_harga DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_produk) REFERENCES dim_produk(id_produk),
    FOREIGN KEY (id_pelanggan) REFERENCES dim_pelanggan(id_pelanggan),
    FOREIGN KEY (id_waktu) REFERENCES dim_waktu(id_waktu)
);

-- =====================================================
-- QUERY 1: Total Penjualan Per Produk
-- =====================================================
-- Menampilkan: nama_produk, total_terjual, total_pendapatan
-- Cocok untuk membandingkan nilai antar kategori

SELECT 
    dp.nama_produk, 
    SUM(fp.jumlah) as total_terjual, 
    SUM(fp.total_harga) as total_pendapatan
FROM fact_penjualan fp
JOIN dim_produk dp ON fp.id_produk = dp.id_produk
GROUP BY dp.id_produk, dp.nama_produk
ORDER BY total_pendapatan DESC;

-- Query 1 dengan Filter Kategori (OLAP Slice):
SELECT 
    dp.nama_produk, 
    SUM(fp.jumlah) as total_terjual, 
    SUM(fp.total_harga) as total_pendapatan
FROM fact_penjualan fp
JOIN dim_produk dp ON fp.id_produk = dp.id_produk
WHERE dp.kategori = 'Elektronik'
GROUP BY dp.id_produk, dp.nama_produk
ORDER BY total_pendapatan DESC;

-- =====================================================
-- QUERY 2: Tren Penjualan Per Bulan
-- =====================================================
-- Menampilkan: bulan_nama, total_pendapatan
-- Cocok untuk melihat tren dari waktu ke waktu

SELECT 
    dw.bulan_nama, 
    SUM(fp.total_harga) as total_pendapatan
FROM fact_penjualan fp
JOIN dim_waktu dw ON fp.id_waktu = dw.id_waktu
GROUP BY dw.bulan, dw.bulan_nama
ORDER BY dw.bulan;

-- Query 2 dengan Filter Kategori (OLAP Slice):
SELECT 
    dw.bulan_nama, 
    SUM(fp.total_harga) as total_pendapatan
FROM fact_penjualan fp
JOIN dim_waktu dw ON fp.id_waktu = dw.id_waktu
JOIN dim_produk dp ON fp.id_produk = dp.id_produk
WHERE dp.kategori = 'Pakaian'
GROUP BY dw.bulan, dw.bulan_nama
ORDER BY dw.bulan;

-- =====================================================
-- QUERY 3: Pelanggan dengan Belanja Tertinggi
-- =====================================================
-- Menampilkan: nama_pelanggan, total_belanja, jumlah_transaksi
-- Cocok untuk menampilkan detail data pelanggan

SELECT 
    dpl.nama_pelanggan, 
    SUM(fp.total_harga) as total_belanja, 
    COUNT(fp.id_penjualan) as jumlah_transaksi
FROM fact_penjualan fp
JOIN dim_pelanggan dpl ON fp.id_pelanggan = dpl.id_pelanggan
GROUP BY dpl.id_pelanggan, dpl.nama_pelanggan
ORDER BY total_belanja DESC;

-- Query 3 dengan Filter Kategori (OLAP Slice):
SELECT 
    dpl.nama_pelanggan, 
    SUM(fp.total_harga) as total_belanja, 
    COUNT(fp.id_penjualan) as jumlah_transaksi
FROM fact_penjualan fp
JOIN dim_pelanggan dpl ON fp.id_pelanggan = dpl.id_pelanggan
JOIN dim_produk dp ON fp.id_produk = dp.id_produk
WHERE dp.kategori = 'Elektronik'
GROUP BY dpl.id_pelanggan, dpl.nama_pelanggan
ORDER BY total_belanja DESC;

-- =====================================================
-- ADDITIONAL USEFUL QUERIES
-- =====================================================

-- Query: Total Penjualan per Kota
SELECT 
    dpl.kota,
    COUNT(fp.id_penjualan) as jumlah_transaksi,
    SUM(fp.total_harga) as total_pendapatan
FROM fact_penjualan fp
JOIN dim_pelanggan dpl ON fp.id_pelanggan = dpl.id_pelanggan
GROUP BY dpl.kota
ORDER BY total_pendapatan DESC;

-- Query: Penjualan per Kategori per Bulan
SELECT 
    dp.kategori,
    dw.bulan_nama,
    SUM(fp.jumlah) as total_unit,
    SUM(fp.total_harga) as total_revenue
FROM fact_penjualan fp
JOIN dim_produk dp ON fp.id_produk = dp.id_produk
JOIN dim_waktu dw ON fp.id_waktu = dw.id_waktu
GROUP BY dp.kategori, dw.bulan, dw.bulan_nama
ORDER BY dw.bulan, dp.kategori;

-- Query: Produk dengan Penjualan Terendah
SELECT 
    dp.nama_produk,
    dp.kategori,
    COALESCE(SUM(fp.jumlah), 0) as total_terjual,
    COALESCE(SUM(fp.total_harga), 0) as total_pendapatan
FROM dim_produk dp
LEFT JOIN fact_penjualan fp ON dp.id_produk = fp.id_produk
GROUP BY dp.id_produk, dp.nama_produk, dp.kategori
ORDER BY total_terjual ASC;

-- Query: Rata-rata Nilai Transaksi per Pelanggan
SELECT 
    dpl.nama_pelanggan,
    dpl.kota,
    COUNT(fp.id_penjualan) as jumlah_transaksi,
    AVG(fp.total_harga) as rata_rata_transaksi,
    SUM(fp.total_harga) as total_belanja
FROM fact_penjualan fp
JOIN dim_pelanggan dpl ON fp.id_pelanggan = dpl.id_pelanggan
GROUP BY dpl.id_pelanggan, dpl.nama_pelanggan, dpl.kota
ORDER BY total_belanja DESC;

-- Query: Perbandingan Penjualan antar Kuartal
SELECT 
    dw.tahun,
    dw.kuartal,
    SUM(fp.jumlah) as total_unit,
    SUM(fp.total_harga) as total_revenue
FROM fact_penjualan fp
JOIN dim_waktu dw ON fp.id_waktu = dw.id_waktu
GROUP BY dw.tahun, dw.kuartal
ORDER BY dw.tahun, dw.kuartal;
