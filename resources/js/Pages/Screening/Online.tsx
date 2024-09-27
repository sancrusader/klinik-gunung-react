"use client";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEvent, useState } from "react";
import { router, useForm, Head } from "@inertiajs/react";
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

const OnlineScreening = ({ auth }: PageProps) => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { data, setData, processing, errors, reset } = useForm({
        full_name: "",
        date_of_birth: "",
        mountain: "",
        citizenship: "",
        country: "",
        address: "",
        phone: "",
        email: "",
        question1: 0,
        question2: 0,
        question3: 0,
        additional_notes: "",
    });

    const storeScreening = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post("/dashboard/screening/online/create", data, {
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
                    Create Online Screening
                </h2>
            }
        >
            <Head title="Create Online Screening" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Card className="w-full max-w-2xl mx-auto">
                                <CardHeader>
                                    <CardTitle>Online Screening Form</CardTitle>
                                    <CardDescription>
                                        Please fill out the form below for your
                                        online screening.
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
                                            <Label htmlFor="date_of_birth">
                                                Date of Birth
                                            </Label>
                                            <Input
                                                id="date_of_birth"
                                                type="date"
                                                name="date_of_birth"
                                                value={data.date_of_birth}
                                                onChange={(e) =>
                                                    setData(
                                                        "date_of_birth",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.date_of_birth && (
                                                <p className="text-sm text-red-500">
                                                    {errors.date_of_birth}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="mountain">
                                                Mountain
                                            </Label>
                                            <Input
                                                id="mountain"
                                                type="text"
                                                name="mountain"
                                                value={data.mountain}
                                                onChange={(e) =>
                                                    setData(
                                                        "mountain",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.mountain && (
                                                <p className="text-sm text-red-500">
                                                    {errors.mountain}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="citizenship">
                                                Citizenship
                                            </Label>
                                            <Input
                                                id="citizenship"
                                                type="text"
                                                name="citizenship"
                                                value={data.citizenship}
                                                onChange={(e) =>
                                                    setData(
                                                        "citizenship",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.citizenship && (
                                                <p className="text-sm text-red-500">
                                                    {errors.citizenship}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="country">
                                                Country
                                            </Label>
                                            <Input
                                                id="country"
                                                type="text"
                                                name="country"
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        "country",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.country && (
                                                <p className="text-sm text-red-500">
                                                    {errors.country}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">
                                                Address
                                            </Label>
                                            <Input
                                                id="address"
                                                type="text"
                                                name="address"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.address && (
                                                <p className="text-sm text-red-500">
                                                    {errors.address}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-red-500">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="question1">
                                                Question 1 (0 or 1)
                                            </Label>
                                            <Input
                                                id="question1"
                                                type="number"
                                                name="question1"
                                                value={data.question1}
                                                onChange={(e) =>
                                                    setData(
                                                        "question1",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                            {errors.question1 && (
                                                <p className="text-sm text-red-500">
                                                    {errors.question1}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="question2">
                                                Question 2 (0 or 1)
                                            </Label>
                                            <Input
                                                id="question2"
                                                type="number"
                                                name="question2"
                                                value={data.question2}
                                                onChange={(e) =>
                                                    setData(
                                                        "question2",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                            {errors.question2 && (
                                                <p className="text-sm text-red-500">
                                                    {errors.question2}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="question3">
                                                Question 3 (0 or 1)
                                            </Label>
                                            <Input
                                                id="question3"
                                                type="number"
                                                name="question3"
                                                value={data.question3}
                                                onChange={(e) =>
                                                    setData(
                                                        "question3",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                            {errors.question3 && (
                                                <p className="text-sm text-red-500">
                                                    {errors.question3}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="additional_notes">
                                                Additional Notes
                                            </Label>
                                            <Input
                                                id="additional_notes"
                                                type="text"
                                                name="additional_notes"
                                                value={data.additional_notes}
                                                onChange={(e) =>
                                                    setData(
                                                        "additional_notes",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.additional_notes && (
                                                <p className="text-sm text-red-500">
                                                    {errors.additional_notes}
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

export default OnlineScreening;
