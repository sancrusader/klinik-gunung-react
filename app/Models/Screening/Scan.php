<?php

namespace App\Models\Screening;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scan extends Model
{
    use HasFactory;

    protected $fillable = [
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
        'additional_notes',
        'status',
        'queue_number'
    ];
}
