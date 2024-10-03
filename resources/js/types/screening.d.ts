export interface Screening {
    id: number;
    full_name: string;
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
}

export interface ScreeningOnline {
    id: number;
    full_name: string;
    queue_number: number | null;
    date_of_birth: string;
    citizenship: string;
    country: string;
    address: string;
    mountain: string;
    phone: number;
    email: string;
    payment_confirmed: boolean;
    status: string;
    question1: string;
    question2: string;
    question3: string;
    health_check_result: string;
}
