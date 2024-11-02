// app/Components/HistoryOffline.tsx
import { Head } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import SideBar from "@/Layouts/Dashboard/Sidebar";
import ScreeningInfo from '@/Components/Screening/ScreeningInfo';
import NoScreeningData from '@/Components/Screening/NoScreeningData';
import { PageProps, User } from '@/types';
import { CheckCircle } from 'lucide-react';
import {Card,CardHeader, CardTitle,CardContent,CardDescription} from "@/Components/ui/card";

interface Screening {
    id: number;
    full_name: string;
    email: string;
    queue_number: number;
    status: 'completed' | 'pending' | 'cancelled';
    created_at: string;
    health_check_result: string;
    isOnline: boolean;
}


interface HistoryOfflineProps {
    auth: {
        user: User;
    };
    screening: Screening | null;
}

export default function HistoryOffline({ auth, screening }: HistoryOfflineProps) {
    const hasScreening = screening !== null;

    return (
        <SideBar header={'Screening Now'}>
            <Head title='Screening Status'/>
            <div className="container mx-auto py-6 px-4 max-w-full">
                {hasScreening && screening.status === 'completed' && (
                    <Alert className="mb-6">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Screening Completed Successfully</AlertTitle>
                        <AlertDescription>
                            Thank you for completing the screening, {auth.user.name}. Your results are now available for review.
                        </AlertDescription>
                    </Alert>
                )}

                <Card className="w-full">
                    <CardHeader className="border-b bg-muted/40">
                        <CardTitle className="text-2xl font-bold">Screening Now</CardTitle>
                        <CardDescription>
                            View and manage your screening information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {hasScreening ? <ScreeningInfo screening={screening} detailRouteName={route('detail.screening', screening.id)} /> : <NoScreeningData detailRouteName={route('screening.offline')} />}
                    </CardContent>
                </Card>
            </div>
        </SideBar>
    );
}
