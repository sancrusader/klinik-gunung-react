<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreeningResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'paramedic_id' => $this->paramedic_id,
            'paramedis' => $this->whenLoaded('paramedis'),
            'doctor_id' => $this->doctor_id,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'queue_number' => $this->queue_number,
            'age' => $this->age,
            'gender' => $this->gender,
            'contact_number' => $this->contact_number,
            'planned_hiking_date' => $this->planned_hiking_date,
            'previous_hikes_count' => $this->previous_hikes_count,
            'physical_health_q1' => $this->physical_health_q1,
            'physical_health_q2' => $this->physical_health_q2,
            'physical_health_q3' => $this->physical_health_q3,
            'physical_health_q4' => $this->physical_health_q4,
            'physical_health_q5' => $this->physical_health_q5,
            'physical_health_q6' => $this->physical_health_q6,
            'experience_knowledge_q1' => $this->experience_knowledge_q1,
            'experience_knowledge_q2' => $this->experience_knowledge_q2,
            'experience_knowledge_q3' => $this->experience_knowledge_q3,
            'experience_knowledge_q4' => $this->experience_knowledge_q4,
            'experience_knowledge_q5' => $this->experience_knowledge_q5,
            'health_check_result' => $this->health_check_result,
            'certificate_issued' => $this->certificate_issued,
            'certificate_path' => $this->certificate_path,
            'blood_pressure' => $this->blood_pressure,
            'heart_rate' => $this->heart_rate,
            'oxygen_saturation' => $this->oxygen_saturation,
            'respiratory_rate' => $this->respiratory_rate,
            'body_temperature' => $this->body_temperature,
            'physical_assessment' => $this->physical_assessment,
            'is_recommended_for_hiking' => $this->is_recommended_for_hiking,
            'not_recommended_reason' => $this->not_recommended_reason,
            'medical_recommendations' => $this->medical_recommendations,
        ];
    }
}
