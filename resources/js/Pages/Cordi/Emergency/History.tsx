import React from "react";
import { PageProps } from "@/types";
import CordiLayout from "@/Layouts/CordiLayout";
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

// Define interface for Emergency
interface Emergency {
    id: number;
    patients_name: string;
    cordi_name: string;
    status: string;
    created_at: string;
}

interface Props extends PageProps {
    emergencies: Emergency[];
}

export default function Index({ auth }: PageProps<{}>) {
    const { emergencies = [] } = usePage<Props>().props;

    return (
        <CordiLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Emergency Calls
                </h2>
            }
        >
            <Head title="Emergency Calls" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">
                                Emergency Calls History
                            </CardTitle>
                            
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-4">
                                <Input
                                    placeholder="Search emergencies..."
                                    className="max-w-sm"
                                />
                                <Button variant="secondary">
                                    <SearchIcon className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                            </div>
                            <Table>
                                <TableCaption>
                                    History of Emergency Calls
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Coordinator</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {emergencies.map((emergency) => (
                                        <TableRow key={emergency.id}>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    {emergency.patients_name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {emergency.cordi_name}
                                            </TableCell>
                                            <TableCell>
                                                {emergency.status}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {new Date(
                                                        emergency.created_at
                                                    ).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Link href="/">Accept</Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CordiLayout>
    );
}
