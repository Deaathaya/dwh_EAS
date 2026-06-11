<?php

namespace App\Http\Controllers;

use App\Models\Waktu;
use Illuminate\Http\Request;
use Carbon\Carbon;

class WaktuController extends Controller
{
    public function index()
    {
        return response()->json(Waktu::orderBy('tanggal')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date|unique:dim_waktu',
        ]);

        $date = Carbon::parse($validated['tanggal']);
        $bulanNama = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        $waktu = Waktu::create([
            'tanggal' => $validated['tanggal'],
            'tahun' => $date->year,
            'bulan' => $date->month,
            'bulan_nama' => $bulanNama[$date->month],
            'kuartal' => ceil($date->month / 3),
        ]);

        return response()->json(['id_waktu' => $waktu->id_waktu], 201);
    }

    public function destroy(Waktu $waktu)
    {
        $waktu->delete();
        return response()->json(['success' => true]);
    }
}
