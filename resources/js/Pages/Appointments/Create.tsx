"use client";

import React, { useState, FormEvent } from "react";
import { useForm, usePage, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppSidebar from "@/Layouts/Dashboard/Sidebar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { CalendarIcon, ClockIcon } from "lucide-react";

interface Doctor {
    id: number;
    name: string;
}

interface Props extends PageProps {
    doctors: Doctor[];
}

export default function CreateAppointment({ auth, doctors }: Props) {
    const [isScheduled, setIsScheduled] = useState<boolean | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: auth.user.id,
        doctor_id: "",
        is_scheduled: "",
        scheduled_at: "",
        unscheduled_reason: "",
        status: "pending",
    });

    const handleScheduleChange = (value: string) => {
        const isScheduledValue = value === "1";
        setIsScheduled(isScheduledValue);
        setData("is_scheduled", isScheduledValue ? "1" : "0");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("appointment.create"), {
            preserveState: true,
            onSuccess: () => {
                setSuccessMessage("Appointment submitted successfully!");
                reset();
            },
            onError: () => {
                setSuccessMessage(null);
            },
        });
    };

    return (
        <AppSidebar header={'Appointment'}>
            <Head title={'Appointments Create'}/>
            <div className="container mx-auto py-12">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Create Appointment
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
                                <Label htmlFor="doctor_id">Select Doctor</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setData("doctor_id", value)
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem
                                                key={doctor.id}
                                                value={doctor.id.toString()}
                                            >
                                                {doctor.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.doctor_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.doctor_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="is_scheduled">
                                    Is this appointment scheduled?
                                </Label>
                                <Select
                                    onValueChange={handleScheduleChange}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">
                                            Scheduled
                                        </SelectItem>
                                        <SelectItem value="0">
                                            Not Scheduled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {isScheduled && (
                                <div className="space-y-2">
                                    <Label htmlFor="scheduled_at">
                                        Date and Time
                                    </Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <Input
                                            type="datetime-local"
                                            id="scheduled_at"
                                            value={data.scheduled_at}
                                            onChange={(e) =>
                                                setData(
                                                    "scheduled_at",
                                                    e.target.value
                                                )
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                    {errors.scheduled_at && (
                                        <p className="text-sm text-red-600">
                                            {errors.scheduled_at}
                                        </p>
                                    )}
                                </div>
                            )}

                            {!isScheduled && isScheduled !== null && (
                                <div className="space-y-2">
                                    <Label htmlFor="unscheduled_reason">
                                        Reason for Not Scheduling
                                    </Label>
                                    <Textarea
                                        id="unscheduled_reason"
                                        value={data.unscheduled_reason}
                                        onChange={(e) =>
                                            setData(
                                                "unscheduled_reason",
                                                e.target.value
                                            )
                                        }
                                        rows={4}
                                        required
                                    />
                                    {errors.unscheduled_reason && (
                                        <p className="text-sm text-red-600">
                                            {errors.unscheduled_reason}
                                        </p>
                                    )}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                Submit Appointment
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppSidebar>
    );
}
