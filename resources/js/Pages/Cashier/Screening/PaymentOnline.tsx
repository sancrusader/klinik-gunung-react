import React from "react";
import { PageProps } from "@/types";
import CashierLayout from "@/Layouts/CashierLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { CalendarIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
export default function PaymentOnline({
    auth,
    screenings = [],
}: PageProps<{
    screenings?: {
        full_name: string;
        date_of_birth: string;
        mountain: string;
        citizenship: string;
        country: string;
        address: string;
        phone: number;
        payment_status: string;
    }[];
    latestScreening?: string;
}>) {
    return (
        <>
            <CashierLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Screening Online List
                    </h2>
                }
            >
                <Head title="Offline Screening" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-2xl font-bold">
                                    Online Screening
                                </CardTitle>
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
                                        List of Offline Screening Entries
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Full Name</TableHead>
                                            <TableHead>Date Of Birth</TableHead>
                                            <TableHead>Mountain</TableHead>
                                            <TableHead>Citizenship</TableHead>
                                            <TableHead>Country</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Payment</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {screenings.map((screening) => (
                                            <TableRow>
                                                <TableCell className="font-medium">
                                                    {screening.full_name}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {screening.date_of_birth}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {screening.mountain}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {screening.citizenship}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {screening.country}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {screening.address}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {screening.phone}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {screening.payment_status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CashierLayout>
        </>
    );
}
