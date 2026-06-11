<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use Illuminate\Http\Request;

class PenjualanController extends Controller
{
    public function index()
    {
        return response()->json(
            Penjualan::with(['produk', 'pelanggan', 'waktu'])
                ->orderBy('id_penjualan')
                ->get()
                ->map(fn($p) => [
                    'id_penjualan' => $p->id_penjualan,
                    'id_produk' => $p->id_produk,
                    'id_pelanggan' => $p->id_pelanggan,
                    'id_waktu' => $p->id_waktu,
                    'nama_produk' => $p->produk->nama_produk,
                    'nama_pelanggan' => $p->pelanggan->nama_pelanggan,
                    'tanggal' => $p->waktu->tanggal,
                    'jumlah' => $p->jumlah,
                    'harga_satuan' => $p->harga_satuan,
                    'total_harga' => $p->total_harga,
                ])
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_produk' => 'required|exists:dim_produk,id_produk',
            'id_pelanggan' => 'required|exists:dim_pelanggan,id_pelanggan',
            'id_waktu' => 'required|exists:dim_waktu,id_waktu',
            'jumlah' => 'required|integer|min:1',
            'harga_satuan' => 'required|numeric|min:0',
        ]);

        $total_harga = $validated['jumlah'] * $validated['harga_satuan'];
        $penjualan = Penjualan::create(array_merge($validated, ['total_harga' => $total_harga]));

        return response()->json(['id_penjualan' => $penjualan->id_penjualan], 201);
    }

    public function update(Request $request, Penjualan $penjualan)
    {
        $validated = $request->validate([
            'id_produk' => 'required|exists:dim_produk,id_produk',
            'id_pelanggan' => 'required|exists:dim_pelanggan,id_pelanggan',
            'id_waktu' => 'required|exists:dim_waktu,id_waktu',
            'jumlah' => 'required|integer|min:1',
            'harga_satuan' => 'required|numeric|min:0',
        ]);

        $total_harga = $validated['jumlah'] * $validated['harga_satuan'];
        $penjualan->update(array_merge($validated, ['total_harga' => $total_harga]));

        return response()->json(['success' => true]);
    }

    public function destroy(Penjualan $penjualan)
    {
        $penjualan->delete();
        return response()->json(['success' => true]);
    }
}
