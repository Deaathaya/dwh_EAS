<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $table = 'dim_produk';
    protected $primaryKey = 'id_produk';
    protected $fillable = ['kode_produk', 'nama_produk', 'kategori', 'harga'];

    public function penjualan()
    {
        return $this->hasMany(Penjualan::class, 'id_produk', 'id_produk');
    }
}
