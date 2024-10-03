"use client";

import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import ParamedisLayout from "@/Layouts/ParamedisLayout";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Input } from "@/Components/ui/input";
import HealthCheckForm from "@/Components/HealthCheck/HealthCheckForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

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
    [K in keyof Questions]: string[];
};

const ScreeningQuestionnaire: React.FC<{
    screening: Screening;
    questions: Questions;
    auth: Auth;
}> = ({ screening, questions, auth }) => {
    const { data, setData, post, processing, errors } = useForm<FormData>(
        Object.keys(questions).reduce(
            (acc, key) => ({ ...acc, [key]: [] }),
            {} as FormData
        )
    );

    const [tempInputs, setTempInputs] = useState<{ [key: string]: string }>({});

    const handleCheckboxChange = (name: keyof FormData, value: string) => {
        setData(
            name,
            data[name].includes(value)
                ? data[name].filter((item) => item !== value)
                : [...data[name], value]
        );
    };

    const handleArrayInputChange = (name: keyof FormData, value: string) => {
        setTempInputs({ ...tempInputs, [name]: value });
    };

    const handleArrayInputSubmit = (name: keyof FormData) => {
        const value = tempInputs[name];
        if (value?.trim()) {
            setData(name, [...data[name], value.trim()]);
            setTempInputs({ ...tempInputs, [name]: "" });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("paramedis.questioner.store", screening.id));
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
                            checked={data[questionKey].includes(option)}
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
                            checked={data[questionKey].includes(option)}
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
                {data[questionKey].map((item, index) => (
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
        <ParamedisLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Screening Offline
                </h2>
            }
        >
            <Head title="Screening Offline" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Screening Questionnaire</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
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

                                <Button type="submit" disabled={processing}>
                                    {processing ? "Submitting..." : "Submit"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ParamedisLayout>
    );
};

export default ScreeningQuestionnaire;
