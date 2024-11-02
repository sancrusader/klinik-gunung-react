import React, { useRef, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Search } from "lucide-react";
import { Toaster } from "sonner";
import ParamedisSidebar from "@/Layouts/Dashboard/ParamedisSidebar";
import { PageProps } from "@/types";
import { Screening } from "@/types/screening";
import PageContainer from "@/Layouts/PageContainer";
import HealthCheckForm from "@/Components/HealthCheck/HealthCheckForm";
import { Select, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectGroup, SelectValue } from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function Offline({ auth, screenings, pagination_links }: PageProps<{ screenings: { data: Screening[] }; pagination_links: string }>) {
    const [searchQuery, setSearchQuery] = useState("");
    const perpage = useRef(10);
    const [isLoading, setIsLoading] = useState(false);

    const screeningsData = screenings?.data || [];

    const filteredScreenings = screeningsData.filter((screening: Screening) =>
        screening.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangePerpage = (value: string) => {
        perpage.current = parseInt(value, 10); // Convert the string value to a number
        getData();
    };

    const getData = () => {
        setIsLoading(true);
        const currentRoute = route().current();
        router.get(route('history.paramedis.screening'), {
            perpage: perpage.current,
        }, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };


    return (
        <ParamedisSidebar header={'History Offline Screening'}>
            <PageContainer scrollable={true}>
                <Head title="Screening Offline" />
                <Toaster position="top-center" />

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Select name="perpage" onValueChange={handleChangePerpage}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select items per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Items per page</SelectLabel>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableCaption>List of Offline Screening Entries</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10px]">Nomor</TableHead>
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={9}>Loading...</td>
                                </tr>
                            ) : (
                                filteredScreenings.map((screening: Screening,index: number) => (
                                    <TableRow key={screening.id}>
                                        <TableCell>{screening.queue_number}</TableCell>
                                        <TableCell>{screening.full_name}</TableCell>
                                        <TableCell>{screening.age}</TableCell>
                                        <TableCell>{screening.gender}</TableCell>
                                        <TableCell>{screening.contact_number}</TableCell>
                                        <TableCell>{screening.planned_hiking_date}</TableCell>
                                        <TableCell>{screening.previous_hikes_count}</TableCell>
                                        <TableCell>
                                            <Link href={route('paramedis.questioner.detail', screening.id)}>
                                                <Button variant="link">Sudah Mengisi</Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={route('physical.paramedis', screening.id)}>
                                                <Button variant="link">Pemeriksaan Fisik</Button>
                                            </Link>
                                        </TableCell>
                                            <TableCell>
                                            {screening.health_check_result ? (
                                                <p>{screening.health_check_result}</p>  // Tampilkan jika ada isinya
                                            ) : (
                                                <HealthCheckForm screening={screening} />  // Tampilkan form jika kosong/null
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className="mt-4" dangerouslySetInnerHTML={{ __html: pagination_links }} />
                    )}
                </div>
            </PageContainer>
            </ParamedisSidebar>
    );
}
