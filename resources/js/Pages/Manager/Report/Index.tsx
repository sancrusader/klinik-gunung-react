import React, { useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { FileDown } from "lucide-react";
import { Input } from "@/Components/ui/input";
import type { PageProps } from "@/types";
import Manager from "@/Layouts/ManagerLayout";

interface ReportFormData {
    periode: "today" | "weekly" | "monthly";
    start_date: string;
    end_date: string;
    selected_month: string; // Tambahkan state untuk bulan
}

export default function ReportPeriodSelection({ auth }: PageProps) {
    const { data, setData, errors } = useForm<ReportFormData>({
        periode: "today",
        start_date: "",
        end_date: "",
        selected_month: "", // Inisialisasi bulan
    });

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        if (data.periode === "today") {
            setData("start_date", today);
            setData("end_date", today);
        }
    }, [data.periode]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const url = route("manager.report.pdf", {
            periode: data.periode,
            start_date: data.start_date,
            end_date: data.end_date,
            month: data.selected_month, // Kirim bulan
        });

        window.open(url, "_blank");
    };

    return (
        <Manager user={auth.user}>
            <Head title="Report" />
            <section className="flex h-screen items-center justify-center">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Laporan Klinik Gunung</CardTitle>
                        <CardDescription>
                            Pilih periode dan rentang tanggal untuk laporan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="periode"
                                    className="text-sm font-medium leading-none"
                                >
                                    Periode:
                                </label>
                                <Select
                                    value={data.periode}
                                    onValueChange={(value) =>
                                        setData(
                                            "periode",
                                            value as
                                                | "today"
                                                | "weekly"
                                                | "monthly"
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih periode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">
                                            Hari Ini
                                        </SelectItem>
                                        <SelectItem value="weekly">
                                            Mingguan
                                        </SelectItem>
                                        <SelectItem value="monthly">
                                            Bulanan
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Input untuk tanggal mulai */}
                            {data.periode !== "today" && (
                                <div className="space-y-2">
                                    <label
                                        htmlFor="start_date"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Tanggal Mulai:
                                    </label>
                                    <Input
                                        type="date"
                                        id="start_date"
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData(
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                </div>
                            )}

                            {/* Input untuk tanggal akhir */}
                            {data.periode === "weekly" && (
                                <div className="space-y-2">
                                    <label
                                        htmlFor="end_date"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Tanggal Akhir:
                                    </label>
                                    <Input
                                        type="date"
                                        id="end_date"
                                        value={data.end_date}
                                        onChange={(e) =>
                                            setData("end_date", e.target.value)
                                        }
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            onClick={handleSubmit}
                        >
                            <FileDown className="mr-2 h-4 w-4" /> Generate PDF
                        </Button>
                    </CardFooter>
                </Card>
            </section>
        </Manager>
    );
}
