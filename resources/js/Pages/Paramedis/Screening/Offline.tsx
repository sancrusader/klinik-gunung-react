import React, { useState } from "react"; // Pastikan untuk mengimpor useState
import { PageProps } from "@/types";
import PageContainer from "@/Layouts/PageContainer";
import Header from "@/Layouts/HeaderParamedis";
import HealthCheckForm from "@/Components/HealthCheck/HealthCheckForm";
import { Toaster } from "sonner";
import { Search } from "lucide-react";
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

export default function Offline({ auth, screenings }: PageProps<{ screenings: any }>) {
    // Ambil data screenings dari objek paginasi
    const screeningsData = screenings?.data || [];  // Akses 'data' dari paginasi

    // State untuk menyimpan kueri pencarian
    const [searchQuery, setSearchQuery] = useState("");

    // Filter screenings berdasarkan kueri pencarian
    const filteredScreenings = screeningsData.filter((screening: Screening) => {
        const fullNameMatch = screening.full_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return fullNameMatch;
    });

    return (
        <Header user={auth.user}>
            <PageContainer scrollable={true}>
                <Head title="Screening Offline" />
                <Toaster position="top-center" />

                {/* Input untuk kueri pencarian */}
                <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Cari nama atau email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

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
                        {filteredScreenings.map((screening) => (
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
                                        href={route("physical.paramedis", {
                                            id: screening.id,
                                        })}
                                    >
                                        Pemeriksaan Fisik
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {screening.health_check_result === "sehat" ? (
                                        <p>{screening.health_check_result}</p>
                                    ) : (
                                        <HealthCheckForm screening={screening} />
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
