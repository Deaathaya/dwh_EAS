<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WaktuSeeder extends Seeder
{
    public function run(): void
    {
        $bulanNama = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        $tanggalList = [
            ['2025-01-15', 2025, 1, 'Januari', 1],
            ['2025-02-20', 2025, 2, 'Februari', 1],
            ['2025-03-10', 2025, 3, 'Maret', 1],
            ['2025-04-05', 2025, 4, 'April', 2],
            ['2025-05-30', 2025, 5, 'Mei', 2],
        ];

        foreach ($tanggalList as $t) {
            DB::table('dim_waktu')->insert([
                'tanggal' => $t[0],
                'tahun' => $t[1],
                'bulan' => $t[2],
                'bulan_nama' => $t[3],
                'kuartal' => $t[4],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
