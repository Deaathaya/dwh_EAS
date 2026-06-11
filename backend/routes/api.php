<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\PelangganController;
use App\Http\Controllers\WaktuController;
use App\Http\Controllers\PenjualanController;
use App\Http\Controllers\AnalyticsController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

// Dimensi Routes
Route::apiResource('produk', ProdukController::class);
Route::apiResource('pelanggan', PelangganController::class);
Route::apiResource('waktu', WaktuController::class)->only(['index', 'store', 'destroy']);
Route::apiResource('penjualan', PenjualanController::class);

// Analytics Routes
Route::get('/query/penjualan-per-produk', [AnalyticsController::class, 'penjualanPerProduk']);
Route::get('/query/tren-per-bulan', [AnalyticsController::class, 'trenPerBulan']);
Route::get('/query/pelanggan-tertinggi', [AnalyticsController::class, 'pelangganTertinggi']);
Route::get('/kategori', [AnalyticsController::class, 'kategoriList']);
