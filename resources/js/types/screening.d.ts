export interface Screening {
    id: number;
    full_name: string;
    paramedic_id: number;
    paramedis: {
        name: string;
    };
    email: string;
    doctor_id: number;
    queue_number: number;
    age: number;
    gender: string;
    contact_number: string;
    planned_hiking_date: string;
    previous_hikes_count: number;
    health_check_result: string;
    physical_health_q1: string;
    physical_health_q2: string;
    physical_health_q3: string;
    physical_health_q4: string;
    physical_health_q5: string;
    physical_health_q6: string;
    experience_knowledge_q1: string;
    experience_knowledge_q2: string;
    experience_knowledge_q3: string;
    experience_knowledge_q4: string;
    experience_knowledge_q5: string;
    blood_pressure?: string;
    heart_rate?: number;
    oxygen_saturation?: number;
    respiratory_rate?: number;
    body_temperature?: number;
    physical_assessment?: string;
    is_recommended_for_hiking?: boolean;
    not_recommended_reason?: string;
    medical_recommendations?: string;
    created_at: string;
    status: 'completed' | 'pending' | 'cancelled';
}
