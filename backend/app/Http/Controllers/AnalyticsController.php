<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function penjualanPerProduk(Request $request)
    {
        $query = DB::table('fact_penjualan as fp')
            ->join('dim_produk as dp', 'fp.id_produk', '=', 'dp.id_produk')
            ->selectRaw('dp.nama_produk, SUM(fp.jumlah) as total_terjual, SUM(fp.total_harga) as total_pendapatan')
            ->groupBy('dp.id_produk', 'dp.nama_produk');

        if ($request->has('kategori') && $request->kategori) {
            $query->where('dp.kategori', $request->kategori);
        }

        return response()->json($query->orderByDesc('total_pendapatan')->get());
    }

    public function trenPerBulan(Request $request)
    {
        $query = DB::table('fact_penjualan as fp')
            ->join('dim_waktu as dw', 'fp.id_waktu', '=', 'dw.id_waktu')
            ->join('dim_produk as dp', 'fp.id_produk', '=', 'dp.id_produk')
            ->selectRaw('dw.bulan_nama, SUM(fp.total_harga) as total_pendapatan')
            ->groupBy('dw.bulan', 'dw.bulan_nama');

        if ($request->has('kategori') && $request->kategori) {
            $query->where('dp.kategori', $request->kategori);
        }

        return response()->json($query->orderBy('dw.bulan')->get());
    }

    public function pelangganTertinggi(Request $request)
    {
        $query = DB::table('fact_penjualan as fp')
            ->join('dim_pelanggan as dpl', 'fp.id_pelanggan', '=', 'dpl.id_pelanggan')
            ->join('dim_produk as dp', 'fp.id_produk', '=', 'dp.id_produk')
            ->selectRaw('dpl.nama_pelanggan, SUM(fp.total_harga) as total_belanja, COUNT(fp.id_penjualan) as jumlah_transaksi')
            ->groupBy('dpl.id_pelanggan', 'dpl.nama_pelanggan');

        if ($request->has('kategori') && $request->kategori) {
            $query->where('dp.kategori', $request->kategori);
        }

        return response()->json($query->orderByDesc('total_belanja')->get());
    }

    public function kategoriList()
    {
        $kategori = DB::table('dim_produk')
            ->selectRaw('DISTINCT kategori')
            ->orderBy('kategori')
            ->pluck('kategori');

        return response()->json($kategori);
    }
}
