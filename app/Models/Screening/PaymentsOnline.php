<?php

namespace App\Models\Screening;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentsOnline extends Model
{
    use HasFactory;
    protected $table = 'payments_online';

    protected $fillable = [
        'id',
        'cashier_id',
        'screening_id',
        'payment_status',
        'payment_method',
        'amount_paid',
        'quantity_product',
        'payment_proof',
    ];

    public function screening()
    {
        return $this->belongsTo(Online::class, 'user_id');
    }

    // Relasi dengan table users
    public function cashier()
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }

    public function screening_online()
    {
        return $this->belongsTo(Online::class, 'screening_id'); // Adjust the second parameter if necessary
    }
}