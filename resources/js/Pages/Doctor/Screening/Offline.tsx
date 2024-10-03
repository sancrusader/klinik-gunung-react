import { PageProps } from "@/types";
import HealthCheckForm from "@/Components/HealthCheck/HealthCheckForm";
import PageContainer from "@/Layouts/PageContainer";
import Header from "@/Layouts/DoctorLayout";

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
                                Antrian
                            </TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Umur</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Kontak</TableHead>
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
                                    {screening.health_check_result ? (
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
                                    ) : (
                                        <Link
                                            className="text-blue-600"
                                            href={route(
                                                "paramedis.questioner",
                                                {
                                                    id: screening.id,
                                                }
                                            )}
                                        >
                                            Questioner
                                        </Link>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <TableCell>
                                        {screening.health_check_result ? (
                                            <span>
                                                {screening.health_check_result}
                                            </span>
                                        ) : (
                                            <HealthCheckForm
                                                screening={screening}
                                            />
                                        )}
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
