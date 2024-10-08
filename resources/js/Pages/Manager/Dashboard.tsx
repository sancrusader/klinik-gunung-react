import ManagerLayout from "@/Layouts/ManagerLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export const description = "A stacked area chart";

export default function Dashboard({ auth }: PageProps) {
    return (
        <ManagerLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
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
        </ManagerLayout>
    );
}
