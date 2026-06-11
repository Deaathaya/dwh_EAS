<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PelangganSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('dim_pelanggan')->insert([
            [
                'kode_pelanggan' => 'CUST001',
                'nama_pelanggan' => 'Budi Santoso',
                'jenis_kelamin' => 'L',
                'kota' => 'Jakarta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_pelanggan' => 'CUST002',
                'nama_pelanggan' => 'Siti Aisyah',
                'jenis_kelamin' => 'P',
                'kota' => 'Surabaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_pelanggan' => 'CUST003',
                'nama_pelanggan' => 'Agus Wijaya',
                'jenis_kelamin' => 'L',
                'kota' => 'Bandung',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_pelanggan' => 'CUST004',
                'nama_pelanggan' => 'Rina Kusuma',
                'jenis_kelamin' => 'P',
                'kota' => 'Medan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_pelanggan' => 'CUST005',
                'nama_pelanggan' => 'Bambang Hermanto',
                'jenis_kelamin' => 'L',
                'kota' => 'Yogyakarta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
