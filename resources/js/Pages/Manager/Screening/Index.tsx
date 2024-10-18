import React from "react";
import { PageProps } from "@/types";
import PageContainer from "@/Layouts/PageContainer";
import Header from "@/Layouts/ManagerLayout";

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

import { Screening } from "@/types/screening";

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
                            <TableHead>Nama Lengkap</TableHead>
                            <TableHead>Diperiksa</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {screenings.map((screening) => (
                            <TableRow key={screening.id}>
                                <TableCell>{screening.full_name}</TableCell>
                                <TableCell>{screening.paramedis.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PageContainer>
        </Header>
    );
}
