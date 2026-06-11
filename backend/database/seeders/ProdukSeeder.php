<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('dim_produk')->insert([
            [
                'kode_produk' => 'PROD001',
                'nama_produk' => 'Laptop Asus',
                'kategori' => 'Elektronik',
                'harga' => 8500000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_produk' => 'PROD002',
                'nama_produk' => 'Mouse Logitech',
                'kategori' => 'Elektronik',
                'harga' => 250000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_produk' => 'PROD003',
                'nama_produk' => 'Keyboard Mechanical',
                'kategori' => 'Elektronik',
                'harga' => 750000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_produk' => 'PROD004',
                'nama_produk' => 'T-Shirt Cotton',
                'kategori' => 'Pakaian',
                'harga' => 150000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_produk' => 'PROD005',
                'nama_produk' => 'Jaket Denim',
                'kategori' => 'Pakaian',
                'harga' => 500000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
