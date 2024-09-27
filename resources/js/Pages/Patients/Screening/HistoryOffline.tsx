import React from "react";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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

interface Props extends PageProps {
    screenings: Screening[];
}

export default function OfflineList({ auth }: Props) {
    const { screenings = [] } = usePage<Props>().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Offline Screening
                </h2>
            }
        >
            <Head title="Offline Screening" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">
                                Offline Screening List
                            </CardTitle>
                            <Link href={route("screening.offline")}>
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
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {screenings.map((screening) => (
                                        <TableRow key={screening.id}>
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
