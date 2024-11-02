"use client";

import React, { useState, FormEvent } from "react";
import { useForm, Head } from "@inertiajs/react";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Input } from "@/Components/ui/input";
import Sidebar from "@/Layouts/Dashboard/Sidebar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import { Toaster, toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface Screening {
    id: number;
    is_filled?: boolean;
}

interface Auth {
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Questions {
    [key: string]: string;
}

type FormData = {
    full_name: string;
    age: string;
    email: string;
    gender: string;
    contact_number: string;
    planned_hiking_date: string;
    previous_hikes_count: string;
    [key: string]: string | string[]; // Ini mengizinkan properti dinamis dengan tipe string[] untuk pertanyaan
};

const Offline: React.FC<{
    screening: Screening;
    questions: Questions;
    auth: Auth;
}> = ({ screening, questions, auth }) => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const initialData: FormData = {
        full_name: "",
        age: "",
        email: "",
        gender: "",
        contact_number: "",
        planned_hiking_date: "",
        previous_hikes_count: "",
        // Menambahkan data dinamis untuk questions, yang akan menjadi array string
        ...Object.keys(questions).reduce(
            (acc, key) => ({ ...acc, [key]: [] }),
            {} as { [key: string]: string[] }
        ),
    };

    const { data, setData, post, processing, errors } =
        useForm<FormData>(initialData);

    const [tempInputs, setTempInputs] = useState<{ [key: string]: string }>({});

    const handleCheckboxChange = (name: keyof FormData, value: string) => {
        const currentValue = data[name] as string[];
        setData(
            name,
            currentValue.includes(value)
                ? currentValue.filter((item) => item !== value)
                : [...currentValue, value]
        );
    };

    const handleArrayInputChange = (name: keyof FormData, value: string) => {
        setTempInputs({ ...tempInputs, [name]: value });
    };

    const handleArrayInputSubmit = (name: keyof FormData) => {
        const value = tempInputs[name];
        if (value?.trim()) {
            const currentValue = data[name] as string[];
            setData(name, [...currentValue, value.trim()]);
            setTempInputs({ ...tempInputs, [name]: "" });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("screening.offline.store"), {
            onSuccess: () => {
                toast.success(
                    `Screening untuk ${data.full_name} Berhasil Dibuat!`
                );
            },
            onError: () => {
                setSuccessMessage(null);
                toast.error(
                    "Failed to submit screening form. Please check the errors and try again."
                );
                console.error(errors);
            },
        });
    };

    const renderQuestion = (
        questionKey: keyof Questions,
        options: string[]
    ) => (
        <li key={questionKey}>
            <p className="font-medium mb-2">{questions[questionKey]}</p>
            <div className="space-y-2">
                {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                            id={`${questionKey}-${option}`}
                            checked={(data[questionKey] as string[]).includes(
                                option
                            )}
                            onCheckedChange={() =>
                                handleCheckboxChange(questionKey, option)
                            }
                        />
                        <Label htmlFor={`${questionKey}-${option}`}>
                            {option}
                        </Label>
                    </div>
                ))}
            </div>
            {errors[questionKey] && (
                <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{errors[questionKey]}</AlertDescription>
                </Alert>
            )}
        </li>
    );

    const renderArrayInputQuestion = (questionKey: keyof Questions) => (
        <li key={questionKey}>
            <p className="font-medium mb-2">{questions[questionKey]}</p>
            <div className="space-y-2">
                {["Ya", "Tidak"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                            id={`${questionKey}-${option}`}
                            checked={(data[questionKey] as string[]).includes(
                                option
                            )}
                            onCheckedChange={() =>
                                handleCheckboxChange(questionKey, option)
                            }
                        />
                        <Label htmlFor={`${questionKey}-${option}`}>
                            {option}
                        </Label>
                    </div>
                ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
                <Input
                    value={tempInputs[questionKey] || ""}
                    onChange={(e) =>
                        handleArrayInputChange(questionKey, e.target.value)
                    }
                    placeholder="Sebutkan.."
                />
                <Button
                    type="button"
                    onClick={() => handleArrayInputSubmit(questionKey)}
                >
                    Add
                </Button>
            </div>
            <div className="mt-2">
                {(data[questionKey] as string[]).map((item, index) => (
                    <div
                        key={index}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                        {item}
                    </div>
                ))}
            </div>
            {errors[questionKey] && (
                <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{errors[questionKey]}</AlertDescription>
                </Alert>
            )}
        </li>
    );

    return (
        <Sidebar header={'Offline Screening'}>
            <Head title="Screening Offline" />
            <Toaster position="top-center" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Screening Form</CardTitle>
                            <CardDescription>
                                Please fill out the form below for your hiking
                                screening.
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
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            name="full_name"
                                            value={data.full_name}
                                            placeholder="Name"
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
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
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
                                            placeholder="Age"
                                            value={data.age}
                                            onChange={(e) =>
                                                setData("age", e.target.value)
                                            }
                                        />
                                        {errors.age && (
                                            <p className="text-sm text-red-500">
                                                {errors.age}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
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
                                            placeholder="Contact Number"
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
                                            placeholder="Planned Hiking Date"
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
                                            Number of Previous Hikes (mdpl)
                                        </Label>
                                        <Input
                                            id="previous_hikes_count"
                                            type="number"
                                            name="previous_hikes_count"
                                            placeholder="Previous Hikes Count"
                                            value={data.previous_hikes_count}
                                            onChange={(e) =>
                                                setData(
                                                    "previous_hikes_count",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.previous_hikes_count && (
                                            <p className="text-sm text-red-500">
                                                {errors.previous_hikes_count}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <ol className="space-y-6 list-decimal list-inside">
                                    {renderQuestion("physical_health_q1", [
                                        "Penyakit Jantung",
                                        "Hipertensi (tekanan darah tinggi)",
                                        "Hipotensi(tekanan darah rendah)",
                                        "Diabetes",
                                        "Masalah paru-paru lainnya",
                                        "Cedera sendi/lutut/pergelangan kaki",
                                        "Tidak ada dari yang disebutkan",
                                    ])}
                                    {renderQuestion("physical_health_q2", [
                                        "Kurang Dari 6 bulan yang lalu",
                                        "6 bulan - 1 tahun lalu",
                                        "Lebih dari 1 tahun lalu",
                                        "Belum pernah melakukan",
                                    ])}
                                    {renderQuestion("physical_health_q3", [
                                        "Pernapasan saat berolahraga berat",
                                        "Daya tahan tubuh saat melakukan aktivitas",
                                        "Tidak ada masalah di atas",
                                    ])}
                                    {renderArrayInputQuestion(
                                        "physical_health_q4"
                                    )}
                                    {renderQuestion("physical_health_q5", [
                                        "Sangat Baik",
                                        "Baik",
                                        "Cukup",
                                        "Buruk",
                                    ])}
                                    {renderArrayInputQuestion(
                                        "physical_health_q6"
                                    )}
                                    {renderQuestion("experience_knowledge_q1", [
                                        "Ya",
                                        "Tidak",
                                    ])}
                                    {renderQuestion("experience_knowledge_q2", [
                                        "Ya",
                                        "Tidak",
                                    ])}
                                    {renderQuestion("experience_knowledge_q3", [
                                        "Ya",
                                        "Tidak",
                                    ])}
                                    {renderQuestion("experience_knowledge_q4", [
                                        "Peta dan kompas/GPS",
                                        "Pisau multi-fungsi",
                                        "Kit pertolongan pertama",
                                        "Lampu senter/headlamp",
                                        "Tidak membawa atau tidak tahu cara menggunakannya",
                                    ])}
                                    {renderQuestion("experience_knowledge_q5", [
                                        "Membawa pakaian waterproof dan windproof",
                                        "Membawa pakaian berlapis untuk ketinggian",
                                        "Membawa jas hujan atau ponco",
                                        "Tidak tahu apa yang harus dibawa",
                                    ])}
                                </ol>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing ? "Submitting..." : "Submit"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Sidebar>
    );
};

export default Offline;
