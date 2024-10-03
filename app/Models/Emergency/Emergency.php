<?php

namespace App\Models\Emergency;

use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Emergency extends Model
{
    use HasFactory;

    protected $table = 'emergency_calls';
    protected $fillable = ['patients_id', 'cordi_id', 'status'];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patients_id');
    }

    public function cordi()
    {
        return $this->belongsTo(User::class, 'cordi_id');
    }
}
