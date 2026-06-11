<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    public function index()
    {
        return response()->json(Pelanggan::orderBy('id_pelanggan')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_pelanggan' => 'required|string|unique:dim_pelanggan',
            'nama_pelanggan' => 'required|string',
            'jenis_kelamin' => 'required|in:L,P',
            'kota' => 'required|string',
        ]);

        $pelanggan = Pelanggan::create($validated);
        return response()->json(['id_pelanggan' => $pelanggan->id_pelanggan], 201);
    }

    public function show(Pelanggan $pelanggan)
    {
        return response()->json($pelanggan);
    }

    public function update(Request $request, Pelanggan $pelanggan)
    {
        $validated = $request->validate([
            'kode_pelanggan' => 'required|string|unique:dim_pelanggan,kode_pelanggan,' . $pelanggan->id_pelanggan . ',id_pelanggan',
            'nama_pelanggan' => 'required|string',
            'jenis_kelamin' => 'required|in:L,P',
            'kota' => 'required|string',
        ]);

        $pelanggan->update($validated);
        return response()->json(['success' => true]);
    }

    public function destroy(Pelanggan $pelanggan)
    {
        $pelanggan->delete();
        return response()->json(['success' => true]);
    }
}
