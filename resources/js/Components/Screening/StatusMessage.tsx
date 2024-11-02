export interface Screening {
    id: number;
    full_name: string;
    email: string;
    queue_number: number;
    status: 'completed' | 'pending' | 'cancelled';
    created_at: string;
    health_check_result: string;
    isOnline: boolean; // Tambahkan properti ini
}

const StatusMessage = ({ status, isOnline = false }: { status: Screening['status']; isOnline?: boolean }) => {
    const messages = {
        completed: isOnline
            ? "Your online screening has been completed. Check your email for results."
            : "Your screening has been completed. You can view your results below.",
        pending: isOnline
            ? "Your online screening is being processed. Please complete the payment first to view the results."
            : "Your screening is being processed.",
        cancelled: isOnline
            ? "This online screening has been cancelled. Please contact support for assistance."
            : "This screening has been cancelled. Please contact support if you need assistance."
    };
    return <p className="text-muted-foreground">{messages[status]}</p>;
};

export default StatusMessage;
