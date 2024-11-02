"use client";

import React, { useState } from "react";
import { usePage, router, Link, Head } from "@inertiajs/react";
import DoctorSidebar from "@/Layouts/Dashboard/DoctorSidebar";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { CalendarIcon, ClipboardIcon, UserIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import PageContainer from "@/Layouts/PageContainer";

interface Appointment {
    id: number;
    scheduled_at: string | null;
    unscheduled_reason: string | null;
    status: string;
    user: {
        name: string;
    };
}

interface Props extends PageProps {
    appointments: Appointment[];
}

export default function DoctorAppointments({ auth }: Props) {
    const { appointments } = usePage<Props>().props;
    const [notification, setNotification] = useState<{
        title: string;
        message: string;
    } | null>(null);

    const handleConfirm = (appointmentId: number) => {
        router.put(
            `/doctor/appointments/${appointmentId}/confirm`,
            {},
            {
                onSuccess: () => {
                    setNotification({
                        title: "Appointment Confirmed",
                        message:
                            "The appointment has been successfully confirmed.",
                    });
                },
            }
        );
    };

    const handleComplete = (appointmentId: number) => {
        router.put(
            `/doctor/appointments/${appointmentId}/complete`,
            {},
            {
                onSuccess: () => {
                    setNotification({
                        title: "Appointment Completed",
                        message:
                            "The appointment has been successfully completed.",
                    });
                },
            }
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="secondary">Pending</Badge>;
            case "confirmed":
                return <Badge>Confirmed</Badge>;
            case "completed":
                return <Badge>Completed</Badge>;
            default:
                return <Badge variant="default">{status}</Badge>;
        }
    };

    return (
        <DoctorSidebar header={'Appointments'}>
        <Head title='Appointments'/>
            <PageContainer>
            <div className="container mx-auto py-10">
                {notification && (
                    <Alert className="mb-4">
                        <AlertTitle>{notification.title}</AlertTitle>
                        <AlertDescription>
                            {notification.message}
                        </AlertDescription>
                    </Alert>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Appointment List
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {appointments.length === 0 ? (
                            <p className="text-center text-muted-foreground">
                                No appointments available.
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Scheduled Date</TableHead>
                                        <TableHead>
                                            Unscheduled Reason
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Medical Record</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    {appointment.user.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {appointment.scheduled_at
                                                        ? new Date(
                                                              appointment.scheduled_at
                                                          ).toLocaleString()
                                                        : "Not scheduled"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {appointment.unscheduled_reason ||
                                                    "-"}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(
                                                    appointment.status
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-x-2">
                                                    <Link
                                                        href={route(
                                                            "doctor.medical_record",
                                                            appointment.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <ClipboardIcon className="mr-2 h-4 w-4" />
                                                            Record
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "doctor.medical_record.detail",
                                                            appointment.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <ClipboardIcon className="mr-2 h-4 w-4" />
                                                            Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {appointment.status ===
                                                    "pending" && (
                                                    <Button
                                                        onClick={() =>
                                                            handleConfirm(
                                                                appointment.id
                                                            )
                                                        }
                                                        size="sm"
                                                    >
                                                        Confirm
                                                    </Button>
                                                )}
                                                {appointment.status ===
                                                    "confirmed" && (
                                                    <Button
                                                        onClick={() =>
                                                            handleComplete(
                                                                appointment.id
                                                            )
                                                        }
                                                        size="sm"
                                                    >
                                                        Complete
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
            </PageContainer>
            </DoctorSidebar>
    );
}
