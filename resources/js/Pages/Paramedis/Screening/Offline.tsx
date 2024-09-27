import React from "react";
import { PageProps } from "@/types";
import ParamedisLayout from "@/Layouts/ParamedisLayout";
import HealthCheckForm from "@/Components/HealthCheckForm";
import PageContainer from "@/Layouts/PageContainer";
import Header from "@/Layouts/HeaderParamedis";
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

interface Screening {
    id: number;
    full_name: string;
    queue_number: number;
    age: number;
    gender: string;
    contact_number: string;
    planned_hiking_date: string;
    previous_hikes_count: number;
    health_check_result: string;
}

interface Props {
    screenings?: Screening[];
}

export default function Offline({ auth }: PageProps) {
    const { screenings = [] } = usePage().props as Props;

    return (
        <Header user={auth.user}>
            <PageContainer scrollable={true}>
                <Head title="Screening Offline" />

                <Table>
                    <TableCaption>
                        List of Offline Screening Entries
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                Queue Number
                            </TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead>Planned Hiking Date</TableHead>
                            <TableHead>Previous Hikes</TableHead>
                            <TableHead>Questioner</TableHead>
                            <TableHead>Status Health</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {screenings.map((screening) => (
                            <TableRow key={screening.id}>
                                <TableCell>{screening.queue_number}</TableCell>
                                <TableCell>{screening.full_name}</TableCell>
                                <TableCell>{screening.age}</TableCell>
                                <TableCell>{screening.gender}</TableCell>
                                <TableCell>
                                    {screening.contact_number}
                                </TableCell>
                                <TableCell>
                                    {screening.planned_hiking_date}
                                </TableCell>
                                <TableCell>
                                    {screening.previous_hikes_count}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        className="text-blue-600"
                                        href={route("paramedis.questioner", {
                                            id: screening.id,
                                        })}
                                    >
                                        Questioner
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <HealthCheckForm screening={screening} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PageContainer>
        </Header>
    );
}
