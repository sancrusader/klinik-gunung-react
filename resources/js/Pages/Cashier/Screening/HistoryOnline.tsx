import React from "react";
import { PageProps } from "@/types";
import { usePage, Head, Link } from "@inertiajs/react";
import CashierSidebar from "@/Layouts/Dashboard/CashierSidebar";
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

interface ScreeningOnline {
    id: number;
    full_name: string;
    queue_number: string | null;
    date_of_birth: string;
    citizenship: string;
    country: string;
    address: string;
    phone: string;
    email: string;
    screening_passed: boolean;
    payment_status: string;
    status: string;
}

interface Props extends PageProps {
    screenings: ScreeningOnline[];
}

export default function ScreeningOnlineList({ auth }: Props) {
    const { screenings } = usePage<Props>().props;
    // console.log(screenings); // Log untuk memeriksa data yang diterima
    const screeningList = Array.isArray(screenings) ? screenings : [];

    return (
        <CashierSidebar header={'Online Screening'}>
            <Head title="Online Screening" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">
                                Online Screening List
                            </CardTitle>
                            <Link href={route("screening.online.create")}>
                                <Button>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Create Screening
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
                                    List of Online Screening Entries
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Queue Number
                                        </TableHead>
                                        <TableHead>Full Name</TableHead>
                                        <TableHead>Date of Birth</TableHead>
                                        <TableHead>Citizenship</TableHead>
                                        <TableHead>Country</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {screeningList.length > 0 ? (
                                        screeningList.map((screening) => (
                                            <TableRow key={screening.id}>
                                                {/* Your TableCell here */}
                                                <TableCell>
                                                    {screening.full_name}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.queue_number}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.date_of_birth}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.citizenship}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.country}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.address}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.phone}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.email}
                                                </TableCell>
                                                <TableCell>
                                                    {screening.payment_status}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="text-center"
                                            >
                                                No screenings available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CashierSidebar>
    );
}
