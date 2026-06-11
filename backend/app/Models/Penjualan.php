<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penjualan extends Model
{
    protected $table = 'fact_penjualan';
    protected $primaryKey = 'id_penjualan';
    protected $fillable = ['id_produk', 'id_pelanggan', 'id_waktu', 'jumlah', 'harga_satuan', 'total_harga'];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'id_produk', 'id_produk');
    }

    public function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class, 'id_pelanggan', 'id_pelanggan');
    }

    public function waktu()
    {
        return $this->belongsTo(Waktu::class, 'id_waktu', 'id_waktu');
    }
}
