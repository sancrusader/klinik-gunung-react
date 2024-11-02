<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $table = 'reports';

    // Tentukan kolom yang dapat diisi (fillable)
    protected $fillable = [
        'type',
        'start_date',
        'end_date',
        'content',
        'created_by',
    ];

    /**
     * Relasi ke model User (untuk kolom created_by).
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
