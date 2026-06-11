<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index()
    {
        return response()->json(Produk::orderBy('id_produk')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_produk' => 'required|string|unique:dim_produk',
            'nama_produk' => 'required|string',
            'kategori' => 'required|string',
            'harga' => 'required|numeric',
        ]);

        $produk = Produk::create($validated);
        return response()->json(['id_produk' => $produk->id_produk], 201);
    }

    public function show(Produk $produk)
    {
        return response()->json($produk);
    }

    public function update(Request $request, Produk $produk)
    {
        $validated = $request->validate([
            'kode_produk' => 'required|string|unique:dim_produk,kode_produk,' . $produk->id_produk . ',id_produk',
            'nama_produk' => 'required|string',
            'kategori' => 'required|string',
            'harga' => 'required|numeric',
        ]);

        $produk->update($validated);
        return response()->json(['success' => true]);
    }

    public function destroy(Produk $produk)
    {
        $produk->delete();
        return response()->json(['success' => true]);
    }
}
