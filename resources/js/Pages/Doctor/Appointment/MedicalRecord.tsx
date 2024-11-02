"use client";

import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import DoctorSidebar from "@/Layouts/Dashboard/DoctorSidebar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

interface Appointment {
    id: number;
    medical_notes: string;
    prescription?: string;
    examination_photo?: string;
}

export default function MedicalRecordForm({
    appointment,
}: {
    appointment: Appointment;
}) {
    const { data, setData, post, processing, errors } = useForm({
        medical_notes: appointment.medical_notes || "",
        prescription: appointment.prescription || "",
        examination_photo: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(
        appointment.examination_photo || null
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("doctor.appointments.medical-record", appointment.id), {
            preserveState: true,
            forceFormData: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("examination_photo", file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <DoctorSidebar header={'Medical Record'}>
        <section className="flex h-screen items-center justify-center">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Medical Record Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="medical_notes">
                                    Medical Notes
                                </Label>
                                <Textarea
                                    id="medical_notes"
                                    value={data.medical_notes}
                                    onChange={(e) =>
                                        setData("medical_notes", e.target.value)
                                    }
                                    rows={4}
                                    required
                                />
                                {errors.medical_notes && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.medical_notes}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="prescription">
                                    Prescription
                                </Label>
                                <Textarea
                                    id="prescription"
                                    value={data.prescription}
                                    onChange={(e) =>
                                        setData("prescription", e.target.value)
                                    }
                                    rows={2}
                                />
                                {errors.prescription && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.prescription}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="examination_photo">
                                    Examination Photo
                                </Label>
                                <Input
                                    type="file"
                                    id="examination_photo"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Examination preview"
                                        className="mt-2 max-w-xs rounded-md"
                                    />
                                )}
                                {errors.examination_photo && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.examination_photo}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        Save Medical Record
                    </Button>
                </CardFooter>
            </Card>
        </section>
        </DoctorSidebar>
    );
}
