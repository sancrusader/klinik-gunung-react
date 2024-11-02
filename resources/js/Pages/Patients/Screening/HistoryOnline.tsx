import { Head } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import SideBar from "@/Layouts/Dashboard/Sidebar";
import ScreeningInfo from '@/Components/Screening/ScreeningInfo';
import NoScreeningData from '@/Components/Screening/NoScreeningData';
import { PageProps, User } from '@/types';
import { CheckCircle, DollarSign } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/Components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Screening {
    id: number;
    full_name: string;
    email: string;
    queue_number: number;
    status: 'completed' | 'pending' | 'cancelled';
    created_at: string;
    health_check_result: string;
    isOnline: boolean;
    payment_status: boolean;
}

interface HistoryOnlineProps {
    auth: {
        user: User;
    };
    screening: Screening | null;
}

export default function HistoryOnline({ auth, screening }: HistoryOnlineProps) {
    const hasScreening = screening !== null;
    const showAlert = screening && !screening.payment_status;


    return (
        <SideBar header={'Screening Now'}>
            <Head title='Screening Status'/>
            <div className="container mx-auto py-6 px-4 max-w-full">
                {hasScreening && screening?.status === 'completed' && (
                    <Alert className="mb-6">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Screening Completed Successfully</AlertTitle>
                        <AlertDescription>
                            Thank you for completing the screening, {auth.user.name}.
                        </AlertDescription>
                    </Alert>
                )}
        {showAlert && (
                <Alert variant="destructive" className="mb-4">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                    Please complete the payment first to view the results.
                </AlertDescription>
                </Alert>
            )}
                <Card className="w-full">
                    <CardHeader className="border-b bg-muted/40">
                        <CardTitle className="text-2xl font-bold">Screening Online Status</CardTitle>
                        <CardDescription>
                            View and manage your screening information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {hasScreening ? (
                            <ScreeningInfo screening={screening} detailRouteName={route('detail.screening.online', screening.id)} />
                        ) : (
                            <NoScreeningData detailRouteName={route('screening.online.history')} />
                        )}
                            {screening?.id && (
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <Button asChild>
                                    <Link href={route('screening.oline.payment', screening.id)}>
                                        Payment Now
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </SideBar>
    );
}
