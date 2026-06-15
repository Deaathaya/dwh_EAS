<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dim_pelanggan', function (Blueprint $table) {
            $table->integer('id_pelanggan')->autoIncrement();
            $table->string('kode_pelanggan', 20)->unique();
            $table->string('nama_pelanggan', 100);
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('kota', 50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dim_pelanggan');
    }
};
