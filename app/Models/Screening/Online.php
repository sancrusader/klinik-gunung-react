<?php

namespace App\Models\Screening;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Online extends Model
{
    use HasFactory;

    protected $table = 'screening_online';

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
        'payment_status',
        'payment_confirmed',
        'certificate_path',
        'certificate_issued',
        'qr_code_url',
        'isOnline',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function uuid()
    {
        return $this->belongsTo(User::class, 'uuid', 'uuid');
    }

}
