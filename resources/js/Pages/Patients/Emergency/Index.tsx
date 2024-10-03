"use client";

import React, { useState, FormEvent } from "react";
import { useForm, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface Coordinator {
    id: number;
    name: string;
}

interface Props extends PageProps {
    coordinators: Coordinator[];
}

export default function CreateEmergencyCall({ auth, coordinators }: Props) {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: auth.user.id,
        cordi_id: "",
        status: "pending",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("emergency_store"), {
            preserveState: true,
            onSuccess: () => {
                setSuccessMessage("Emergency call submitted successfully!");
                reset();
            },
            onError: () => {
                setSuccessMessage(null);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Emergency" />
            <div className="container mx-auto py-12">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Create Emergency Call
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {successMessage && (
                            <Alert className="mb-6">
                                <AlertDescription>
                                    {successMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="coordinator_id"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Select Coordinator
                                </label>
                                <Select
                                    onValueChange={(value) =>
                                        setData("cordi_id", value)
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a coordinator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {coordinators.map((coordinator) => (
                                            <SelectItem
                                                key={coordinator.id}
                                                value={coordinator.id.toString()}
                                            >
                                                {coordinator.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.cordi_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.cordi_id}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                Submit Emergency Call
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
