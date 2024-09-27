"use client";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEvent, useState } from "react";
import { router, useForm, usePage, Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Alert, AlertDescription } from "@/Components/ui/alert";

const Offline = ({ auth }: PageProps) => {
    // const { auth } = usePage().props;
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { data, setData, processing, errors, reset } = useForm({
        full_name: "",
        age: "",
        gender: "",
        contact_number: "",
        planned_hiking_date: "",
        previous_hikes_count: "",
    });

    const storeScreening = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post("/dashboard/screening/offline", data, {
            onSuccess: () => {
                setSuccessMessage("Screening form submitted successfully!");
                reset();
            },
            onError: () => {
                setSuccessMessage(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Screening offline
                </h2>
            }
        >
            <Head title="Create Screening" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Card className="w-full max-w-2xl mx-auto">
                                <CardHeader>
                                    <CardTitle>
                                        Offline Hiking Screening
                                    </CardTitle>
                                    <CardDescription>
                                        Please fill out the form below for your
                                        hiking screening.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {successMessage && (
                                        <Alert className="mb-4">
                                            <AlertDescription>
                                                {successMessage}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    <form
                                        onSubmit={storeScreening}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="full_name"
                                                type="text"
                                                name="full_name"
                                                value={data.full_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "full_name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.full_name && (
                                                <p className="text-sm text-red-500">
                                                    {errors.full_name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="age">Age</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                name="age"
                                                value={data.age}
                                                onChange={(e) =>
                                                    setData(
                                                        "age",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.age && (
                                                <p className="text-sm text-red-500">
                                                    {errors.age}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="gender">
                                                Gender
                                            </Label>
                                            <Select
                                                name="gender"
                                                value={data.gender}
                                                onValueChange={(value) =>
                                                    setData("gender", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem value="female">
                                                        Female
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.gender && (
                                                <p className="text-sm text-red-500">
                                                    {errors.gender}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact_number">
                                                Contact Number
                                            </Label>
                                            <Input
                                                id="contact_number"
                                                type="tel"
                                                name="contact_number"
                                                value={data.contact_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "contact_number",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.contact_number && (
                                                <p className="text-sm text-red-500">
                                                    {errors.contact_number}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="planned_hiking_date">
                                                Planned Hiking Date
                                            </Label>
                                            <Input
                                                id="planned_hiking_date"
                                                type="date"
                                                name="planned_hiking_date"
                                                value={data.planned_hiking_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "planned_hiking_date",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.planned_hiking_date && (
                                                <p className="text-sm text-red-500">
                                                    {errors.planned_hiking_date}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="previous_hikes_count">
                                                Number of Previous Hikes
                                            </Label>
                                            <Input
                                                id="previous_hikes_count"
                                                type="number"
                                                name="previous_hikes_count"
                                                value={
                                                    data.previous_hikes_count
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "previous_hikes_count",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.previous_hikes_count && (
                                                <p className="text-sm text-red-500">
                                                    {
                                                        errors.previous_hikes_count
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Submitting..."
                                                : "Submit"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Offline;
