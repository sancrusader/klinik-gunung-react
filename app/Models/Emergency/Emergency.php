<?php

namespace App\Models\Emergency;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

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
