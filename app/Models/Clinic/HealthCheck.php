<?php

namespace App\Models\Clinic;

use App\Models\Screening\Scan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HealthCheck extends Model
{
    use HasFactory;

    protected $fillable = [
        'scan_id',
        'full_name',
        'date_of_birth',
        'mountain',
        'citizenship',
        'country',
        'address',
        'phone',
        'email',
        'question1',
        'question2',
        'question3',
        'health_status'
    ];

    public function scan()
    {
        return $this->belongsTo(Scan::class);
    }
}
