<?php

namespace App\Models\Appointment;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'doctor_id',
        'scheduled_at',
        'unscheduled_reason',
        'status',
        'medical_notes',
        'prescription',
        'examination_photo',
        'completed_at',
        'follow_up_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
