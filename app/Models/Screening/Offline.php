<?php

namespace App\Models\Screening;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offline extends Model
{
    use HasFactory;

    protected $table = 'screening_offlines';

    // Kolom yang dapat diisi (mass-assignable)
    protected $fillable = [
        'user_id',
        'uuid',
        'paramedic_id',
        'status',
        'doctor_id',
        'status',
        'full_name',
        'email',
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
        'certificate_issued',
        'certificate_path',
        'blood_pressure',
        'heart_rate',
        'oxygen_saturation',
        'respiratory_rate',
        'body_temperature',
        'physical_assessment',
        'is_recommended_for_hiking',
        'not_recommended_reason',
        'medical_recommendations',
        'is_online',
    ];

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
        return $this->belongsTo(User::class, 'user_id');
    }

    public function paramedis()
    {
        return $this->belongsTo(User::class, 'paramedic_id');
    }

    public function payment()
    {
        return $this->hasOne(Payments::class, 'screening_id');
    }

    public function uuid()
    {
        return $this->belongsTo(User::class, 'uuid', 'uuid');
    }

    public function payments()
    {
        return $this->hasMany(Payments::class, 'screening_id');
    }
}
