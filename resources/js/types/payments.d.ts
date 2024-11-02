export type Payments = {
    id: number;
    cashier_id: number,
    cashier?: { name: string };
    screening_id: number,
    screening_offlines?: { full_name: string };
    payment_status: number;
    payment_method: string,
    amount_paid: number,
    created_at: string,
    update_at: string,
}[];
