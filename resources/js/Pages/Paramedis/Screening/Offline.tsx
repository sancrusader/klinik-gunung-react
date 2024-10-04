import React from "react";
import { PageProps } from "@/types";
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
                            <TableHead className="w-[100px]">
                                Nomor Antrian
                            </TableHead>
                            <TableHead>Nama Lengkap</TableHead>
                            <TableHead>Umur</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead>Planned Hiking Date</TableHead>
                            <TableHead>Previous Hikes</TableHead>
                            <TableHead>Questioner</TableHead>
                            <TableHead>Pemeriksaan Fisik</TableHead>
                            <TableHead>Status Kesahatan</TableHead>
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
                                            href={route(
                                                "paramedis.questioner.detail",
                                                {
                                                    id: screening.id,
                                                }
                                            )}
                                        >
                                            Sudah Mengisi
                                        </Link>
                                </TableCell>
                                <TableCell>
                                        <Link
                                            className="text-blue-600"
                                            href={route(
                                                "physical.paramedis",
                                                {
                                                    id: screening.id,
                                                }
                                            )}
                                        >
                                            Pemeriksaan Fisik
                                        </Link>
                                </TableCell>
                                <TableCell>
                                    <TableCell>
                                            <span>
                                                {screening.health_check_result}
                                            </span>
                                    </TableCell>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PageContainer>
        </Header>
    );
}
