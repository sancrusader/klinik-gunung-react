// app/Components/ScreeningInfo.tsx
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Users, Mail, Calendar, FileDown, ArrowRight,CheckCircle,Clock,AlertCircle, DollarSign } from "lucide-react";
import { Link } from '@inertiajs/react';

import StatusMessage from './StatusMessage';
// types.ts
export interface Screening {
    id: number;
    full_name: string;
    email: string;
    queue_number: number;
    status: 'completed' | 'pending' | 'cancelled';
    created_at: string;
    health_check_result: string;
    isOnline: boolean;
}


interface ScreeningInfoProps {
    screening: Screening;
    detailRouteName: string; // New prop for the dynamic route name
}
const StatusIcon = ({ status }: { status: Screening['status'] }) => {
    switch (status) {
        case 'completed':
            return <CheckCircle className="h-8 w-8 text-green-500" />;
        case 'pending':
            return <Clock className="h-8 w-8 text-yellow-500" />;
        case 'cancelled':
            return <AlertCircle className="h-8 w-8 text-red-500" />;
    }
};

const ScreeningInfo = ({ screening, detailRouteName }: ScreeningInfoProps) => {
    const handleDownload = () => {
        window.location.href = route('generate.screening.pdf', `${screening.id}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <StatusIcon status={screening.status} />
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{screening.full_name}</h2>
                        <StatusMessage status={screening.status} isOnline={screening.isOnline} />
                    </div>
                </div>
                <Badge
                    variant={
                        screening.status === 'completed' ? 'default' :
                        screening.status === 'pending' ? 'secondary' : 'destructive'
                    }
                    className="text-sm px-4 py-1"
                >
                    {screening.status.charAt(0).toUpperCase() + screening.status.slice(1)}
                </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-semibold">{screening.full_name}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-semibold">{screening.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Screening Date</p>
                                <p className="font-semibold">{new Date(screening.created_at).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center"
                disabled={!screening.health_check_result}
                >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download PDF
                </Button>
                <Button asChild>
                    <Link href={detailRouteName}>
                        Detail Screening
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>

            </div>
        </div>
    );
};

export default ScreeningInfo;
