<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fact_penjualan', function (Blueprint $table) {
            $table->integer('id_penjualan')->autoIncrement();
            $table->integer('id_produk');
            $table->integer('id_pelanggan');
            $table->integer('id_waktu');
            $table->integer('jumlah');
            $table->decimal('harga_satuan', 10, 2);
            $table->decimal('total_harga', 10, 2);
            $table->timestamps();

            // Foreign keys
            $table->foreign('id_produk')->references('id_produk')->on('dim_produk')->onDelete('cascade');
            $table->foreign('id_pelanggan')->references('id_pelanggan')->on('dim_pelanggan')->onDelete('cascade');
            $table->foreign('id_waktu')->references('id_waktu')->on('dim_waktu')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fact_penjualan');
    }
};
