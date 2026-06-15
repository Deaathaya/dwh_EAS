<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dim_produk', function (Blueprint $table) {
            $table->integer('id_produk')->autoIncrement();
            $table->string('kode_produk', 20)->unique();
            $table->string('nama_produk', 100);
            $table->string('kategori', 50);
            $table->decimal('harga', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dim_produk');
    }
};
