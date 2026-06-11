<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    protected $table = 'dim_pelanggan';
    protected $primaryKey = 'id_pelanggan';
    protected $fillable = ['kode_pelanggan', 'nama_pelanggan', 'jenis_kelamin', 'kota'];

    public function penjualan()
    {
        return $this->hasMany(Penjualan::class, 'id_pelanggan', 'id_pelanggan');
    }
}
