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
import AdminSidebar from "@/Layouts/Dashboard/AdminSidebar";


export default function Users({ auth }: PageProps) {

    return (
        <AdminSidebar header={'Admin Dashboard'}>
            <Head title="Offline Screening" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">
                                List Users
                            </CardTitle>
                            <Link href={route("users.new")}>
                                <Button>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Add Users
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
                                    List Users
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Antrian
                                        </TableHead>
                                        <TableHead>Nama Lengkap</TableHead>
                                        <TableHead>Umur</TableHead>
                                        <TableHead>Jenis Kelamin</TableHead>
                                        <TableHead>Contact Number</TableHead>
                                        <TableHead>
                                            Tanggal Rencana Pendakian
                                        </TableHead>
                                        <TableHead>
                                            Jumlah Pendakian Sebelumnya
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                        {/* <TableRow key={screening.id}>
                                            <TableCell className="font-medium">
                                                {screening.queue_number}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    {screening.full_name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {screening.age}
                                            </TableCell>
                                            <TableCell>
                                                {screening.gender}
                                            </TableCell>
                                            <TableCell>
                                                {screening.contact_number}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {new Date(
                                                        screening.planned_hiking_date
                                                    ).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {screening.previous_hikes_count}
                                            </TableCell>
                                            <TableCell>
                                                {screening.health_check_result}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    className="text-blue-600"
                                                    href={route(
                                                        "detail.screening",
                                                        {
                                                            id: screening.id,
                                                        }
                                                    )}
                                                >
                                                    Detail
                                                </Link>
                                            </TableCell>
                                        </TableRow> */}

                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminSidebar>
    );
}
