<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffSchedule extends Model
{
    use HasFactory;

    protected $fillable = ['staff_id', 'shift', 'schedule_date', 'role'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
