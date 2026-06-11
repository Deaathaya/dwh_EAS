<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Waktu extends Model
{
    protected $table = 'dim_waktu';
    protected $primaryKey = 'id_waktu';
    protected $fillable = ['tanggal', 'tahun', 'bulan', 'bulan_nama', 'kuartal'];
    protected $dates = ['tanggal'];

    public function penjualan()
    {
        return $this->hasMany(Penjualan::class, 'id_waktu', 'id_waktu');
    }
}
