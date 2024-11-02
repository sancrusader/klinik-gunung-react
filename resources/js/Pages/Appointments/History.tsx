import React from "react";
import { PageProps } from "@/types";
import { usePage, Head, Link } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { CalendarIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import AppSidebar from "@/Layouts/Dashboard/Sidebar";
interface Appointment {
    id: number;
    scheduled_at: string | null;
    unscheduled_reason: string | null;
    status: string;
    doctor: {
        name: string;
    };
}

interface Props extends PageProps {
    appointments: Appointment[];
}

export default function OfflineList({ auth }: Props) {
    const { appointments = [] } = usePage<Props>().props;

    return (
        <AppSidebar header={'Appointments List'}>
            <Head title="Appointment List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">
                                Appointment List
                            </CardTitle>
                            <Link href={route("appointment")}>
                                <Button>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Create Appointment
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-4">
                                <Input
                                    placeholder="Search screenings..."
                                    className="max-w-sm"
                                />
                                <Button variant="secondary">
                                    <SearchIcon className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                            </div>
                            <Table>
                                <TableCaption>
                                    List of Appointments
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Schedule</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>
                                            Medical Record Detail
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    {appointment.doctor.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {appointment.scheduled_at}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.status}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/dashboard/appointments/medical-record/${appointment.id}`}
                                                    className="text-blue-600"
                                                >
                                                    Medical Record
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppSidebar>
    );
}
