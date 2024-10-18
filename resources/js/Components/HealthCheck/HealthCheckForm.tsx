import React from "react";
import { useForm } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";

interface Screening {
    id: number;
    health_check_result: string;
}

type HealthStatus = "sehat" | "butuh_pendamping" | "butuh_dokter";

interface FormData {
    health_check_result: HealthStatus;
}

const healthStatusOptions: { value: HealthStatus; label: string }[] = [
    { value: "sehat", label: "Sehat" },
    { value: "butuh_pendamping", label: "Butuh Pendamping" },
    { value: "butuh_dokter", label: "Butuh Dokter" },
];

interface HealthCheckFormProps {
    screening: Screening;
}

export default function HealthCheckForm({ screening }: HealthCheckFormProps) {
    const { data, setData, post, processing } = useForm<FormData>({
        health_check_result:
            (screening.health_check_result as HealthStatus) || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("offline.healthcheck", screening.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Health check result submitted successfully");
            },
            onError: (errors) => {
                toast.error("Failed to submit health check result");
                console.error(errors);
            },
        });
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className="w-full max-w-xs">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center space-x-2"
                >
                    <div>
                        <Select
                            value={data.health_check_result}
                            onValueChange={(value: HealthStatus) =>
                                setData("health_check_result", value)
                            }
                        >
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Pilih Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {healthStatusOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
}
