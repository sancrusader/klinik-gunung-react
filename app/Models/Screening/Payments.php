<?php

namespace App\Models\Screening;

use App\Models\User;
use App\Models\Screening\Offline;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payments extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable =[
        'id',
        'screening_id',
        'payment_status',
        'amount_paid',
        'quantity_product',
        'payment_proof'
    ];

    public function screening()
    {
        return $this->belongsTo(Offline::class, 'user_id');
    }

}
