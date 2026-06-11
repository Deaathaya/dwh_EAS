<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenjualanSeeder extends Seeder
{
    public function run(): void
    {
        $fakta = [
            [1, 1, 1, 1, 8500000, 8500000],
            [2, 2, 1, 2, 250000, 500000],
            [3, 1, 2, 1, 750000, 750000],
            [4, 3, 2, 3, 150000, 450000],
            [5, 4, 2, 2, 500000, 1000000],
            [1, 2, 3, 1, 8500000, 8500000],
            [2, 5, 3, 2, 250000, 250000],
            [3, 3, 4, 3, 750000, 750000],
            [4, 1, 4, 1, 150000, 150000],
            [5, 4, 5, 2, 500000, 500000],
        ];

        foreach ($fakta as $f) {
            DB::table('fact_penjualan')->insert([
                'id_produk' => $f[0],
                'id_pelanggan' => $f[1],
                'id_waktu' => $f[2],
                'jumlah' => $f[3],
                'harga_satuan' => $f[4],
                'total_harga' => $f[5],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
