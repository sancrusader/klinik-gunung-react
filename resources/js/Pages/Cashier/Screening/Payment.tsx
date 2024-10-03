import React from "react";
import { PageProps } from "@/types";
import CashierLayout from "@/Layouts/CashierLayout";
import PaymentForm from "@/Components/PaymentForm";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { usePage, Head } from "@inertiajs/react";

interface Screening {
    id: number;
    full_name: string;
    queue_number: number;
    age: number;
    gender: string;
    contact_number: string;
    planned_hiking_date: string;
    previous_hikes_count: number;
    payment_status: boolean;
}

interface Props {
    screenings?: Screening[];
}

export default function Payment({ auth }: PageProps) {
    const { screenings = [] } = usePage().props as Props;
    return (
        <CashierLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Screening Offline List Payment
                </h2>
            }
        >
            <Head title="Screening Offline" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
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
                                        <TableHead>
                                            Planned Hiking Date
                                        </TableHead>
                                        <TableHead>Previous Hikes</TableHead>
                                        <TableHead>Amount Paid</TableHead>
                                        <TableHead>Confirm Payment</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {screenings.map((screening) => (
                                        <TableRow key={screening.id}>
                                            <TableCell>
                                                {screening.queue_number}
                                            </TableCell>
                                            <TableCell>
                                                {screening.full_name}
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
                                                {screening.planned_hiking_date}
                                            </TableCell>
                                            <TableCell>
                                                {screening.previous_hikes_count}
                                            </TableCell>
                                            <TableCell>
                                                <PaymentForm
                                                    screening={screening}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </CashierLayout>
    );
}
