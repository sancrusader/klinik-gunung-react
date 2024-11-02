import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminSidebar from "@/Layouts/Dashboard/AdminSidebar";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AdminSidebar header={'Admin Dashboard'}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Selamat Datang Di Klinik Gunung
                        </div>
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
