import React from "react";
import { PageProps } from "@/types";
import PageContainer from "@/Layouts/PageContainer";
import Header from "@/Layouts/HeaderParamedis";
import HealthCheckOnline from "@/Components/HealthCheck/HealthCheckOnline";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { usePage, Head, Link } from "@inertiajs/react";
import { ScreeningOnline } from "@/types/screening";

interface Props {
    scans?: ScreeningOnline[];
}

export default function HistoryOnline({ auth }: PageProps) {
    const { scans = [] } = usePage().props as Props;

    return (
        <Header user={auth.user}>
            <PageContainer scrollable={true}>
                <Head title="Screening Online" />

                <Table>
                    <TableCaption>
                        List of Online Screening Entries
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Queue Number</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Date Of Birth</TableHead>
                            <TableHead>Mountain</TableHead>
                            <TableHead>Citizenship</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Question 1</TableHead>
                            <TableHead>Question 2</TableHead>
                            <TableHead>Question 3</TableHead>
                            <TableHead>Health Check Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scans.map((screening) => (
                            <TableRow key={screening.id}>
                                <TableCell>{screening.queue_number}</TableCell>
                                <TableCell>{screening.full_name}</TableCell>
                                <TableCell>{screening.date_of_birth}</TableCell>
                                <TableCell>{screening.mountain}</TableCell>
                                <TableCell>{screening.citizenship}</TableCell>
                                <TableCell>{screening.country}</TableCell>
                                <TableCell>{screening.address}</TableCell>
                                <TableCell>{screening.phone}</TableCell>
                                <TableCell>{screening.question1}</TableCell>
                                <TableCell>{screening.question2}</TableCell>
                                <TableCell>{screening.question3}</TableCell>
                                <TableCell>
                                    {screening.health_check_result ? (
                                        <span>
                                            {screening.health_check_result}
                                        </span>
                                    ) : (
                                        <HealthCheckOnline
                                            screening={screening}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PageContainer>
        </Header>
    );
}
