<?php

namespace App\Models\Screening;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Offline extends Model
{
    use HasFactory;

    protected $table = 'screening_offlines';

    // Kolom yang dapat diisi (mass-assignable)
       protected $fillable = [
        'user_id',
        'full_name',
        'queue_number',
        'age',
        'gender',
        'contact_number',
        'planned_hiking_date',
        'previous_hikes_count',
        'physical_health_q1',
        'physical_health_q2',
        'physical_health_q3',
        'physical_health_q4',
        'physical_health_q5',
        'physical_health_q6',
        'experience_knowledge_q1',
        'experience_knowledge_q2',
        'experience_knowledge_q3',
        'experience_knowledge_q4',
        'experience_knowledge_q5',
        'health_check_result',
        'payment_status',
        'amount_paid',
        'certificate_issued',
        'certificate_path',
        'blood_pressure', // Kolom baru
        'heart_rate', // Kolom baru
        'oxygen_saturation', // Kolom baru
        'respiratory_rate', // Kolom baru
        'body_temperature', // Kolom baru
        'physical_assessment', // Kolom baru
        'is_recommended_for_hiking', // Kolom baru
        'not_recommended_reason', // Kolom baru
        'medical_recommendations', // Kolom baru
    ];
    // Cast atribut ke tipe data tertentu
    protected $casts = [
        'health_check_result' => 'string',
        'payment_status' => 'boolean',
        'certificate_issued' => 'boolean',
    ];

    public static function generateQueueNumber()
    {
        $lastQueueNumber = self::max('queue_number');
        return $lastQueueNumber ? $lastQueueNumber + 1 : 1;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // Asumsikan ada user_id di ScreeningOffline
    }


}
