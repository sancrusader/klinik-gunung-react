import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { UserIcon, LogInIcon, LogOutIcon } from "lucide-react";
import ParamedisSidebar from "@/Layouts/Dashboard/ParamedisSidebar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

interface Activity {
    id: number;
    activity_type: string;
    description: string;
    created_at: string;
}

interface Screening {
    id: number;
    full_name: string;
    health_check_result: string;
    email: string;
    created_at: string;
}

interface ReportProps {
    activities: Activity[];
    screeningCount: number;
    lastLogin: string | null;
    lastLogout: string | null;
    screenings: Screening[];
}

export default function Report({
    activities,
    screeningCount,
    lastLogin,
    lastLogout,
    screenings,
}: ReportProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredScreenings = screenings.filter((screening) => {
        const fullNameMatch = screening.full_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const emailMatch = screening.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return fullNameMatch || emailMatch;
    });

    const handleDownload = () => {
        window.location.href = "/dashboard/paramedis/generate/report";
    };

    return (
<ParamedisSidebar header={'My report'}>
        <div className="min-h-screen bg-gray-100">
            <Head title="Laporan Aktivitas" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Laporan Screening
                </h1>

                <Button
                    onClick={handleDownload}
                    className="mb-4 px-4 py-2 text-white rounded"
                >
                    Download Report
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={<UserIcon className="w-6 h-6" />}
                        title="Screening Diperiksa"
                        value={screeningCount}
                    />
                    <StatCard
                        icon={<LogInIcon className="w-6 h-6" />}
                        title="Login Terakhir"
                        value={
                            lastLogin
                                ? new Date(lastLogin).toLocaleString()
                                : "Belum ada aktivitas"
                        }
                    />
                    <StatCard
                        icon={<LogOutIcon className="w-6 h-6" />}
                        title="Logout Terakhir"
                        value={
                            lastLogout
                                ? new Date(lastLogout).toLocaleString()
                                : "Belum ada aktivitas"
                        }
                    />
                </div>

                {/* Input Pencarian */}
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Cari berdasarkan nama atau email..."
                        className="p-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Screening yang Diperiksa
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Lengkap
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status Kesehatan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredScreenings.length > 0 ? (
                                    filteredScreenings.map((screening) => (
                                        <tr
                                            key={screening.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {screening.full_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {screening.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {screening.health_check_result ?? 'N/A'}
                                                </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(
                                                    screening.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                                        >
                                            Tidak ada screening yang diperiksa.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </ParamedisSidebar>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number | string;
}

function StatCard({ icon, title, value }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
                <div className="mr-4">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
