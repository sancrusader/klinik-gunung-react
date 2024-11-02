import React, { useEffect, useRef, useState } from "react";
import { Head, router } from "@inertiajs/react";
import ParamedisSidebar from "@/Layouts/Dashboard/ParamedisSidebar";
import PageContainer from "@/Layouts/PageContainer";
import { Toaster } from "sonner";
import { PageProps } from "@/types";
import SearchBar from "@/Components/OfflineScreening/SearchBar";
import ScreeningTable from "@/Components/OfflineScreening/ScreeningTable";
import PaginationLinks from "@/Components/OfflineScreening/PaginationLinks";
import { Screening } from "@/types/screening";



export default function Offline({ auth, screenings, pagination_links }: PageProps<{ screenings: { data: Screening[] }; pagination_links: string }>) {
    const [searchQuery, setSearchQuery] = useState("");
    const perpage = useRef(10);
    const [isLoading, setIsLoading] = useState(false);

    const screeningsData = screenings?.data || [];

    const handleChangePerpage = (value: string) => {
        perpage.current = parseInt(value, 10);
        getData();
    };
    const getData = () => {
        setIsLoading(true);
        router.get(route('paramedis.screening.offline'), {
            perpage: perpage.current,
        }, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };
    return (
        <ParamedisSidebar header={'Offline Screening'}>
            <PageContainer scrollable={true}>
                <Head title="Offline Screening" />
                <Toaster position="top-center" />
                <div className="space-y-4">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleChangePerpage={handleChangePerpage} />
                    <ScreeningTable screenings={screeningsData} isLoading={isLoading} searchQuery={searchQuery} />
                    <PaginationLinks pagination_links={pagination_links} isLoading={isLoading} />
                </div>
            </PageContainer>
        </ParamedisSidebar>
    );
}
