"use client";

import ParamedisLayout from "@/Layouts/ParamedisLayout";
import React, { useState } from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import { Checkbox } from "@/Components/ui/checkbox";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Input } from "@/Components/ui/input";

interface Screening {
    id: number;
    // Other screening properties
    is_filled?: boolean;
}

interface Auth {
    user: {
        id: number;
        name: string;
        email: string;
        // Tambahkan properti lain yang relevan
    };
}

interface Questions {
    physical_health_q1: string;
    physical_health_q2: string;
    physical_health_q3: string;
    physical_health_q4: string;
    physical_health_q5: string;
    physical_health_q6: string;
    experience_knowledge_q1: string;
    experience_knowledge_q2: string;
    experience_knowledge_q3: string;
    experience_knowledge_q4: string;
    experience_knowledge_q5: string;
}

const ScreeningQuestionnaire: React.FC<{
    screening: Screening;
    questions: Questions;
}> = ({ screening, questions }) => {
    const { data, setData, post, processing, errors } = useForm({
        physical_health_q1: [] as string[],
        physical_health_q2: [] as string[],
        physical_health_q3: [] as string[],
        physical_health_q4: [] as string[],
        physical_health_q5: [] as string[],
        physical_health_q6: [] as string[],
        experience_knowledge_q1: [] as string[],
        experience_knowledge_q2: [] as string[],
        experience_knowledge_q3: [] as string[],
        experience_knowledge_q4: [] as string[],
        experience_knowledge_q5: [] as string[],
    });

    const [tempQ4, setTempQ4] = useState("");
    const [tempQ6, setTempQ6] = useState("");
    const { auth } = usePage<{ auth: Auth }>().props;

    const handleCheckboxChange = (name: keyof typeof data, value: string) => {
        const currentData = data[name];
        if (Array.isArray(currentData)) {
            const updatedData = currentData.includes(value)
                ? currentData.filter((item) => item !== value)
                : [...currentData, value];
            setData(name, updatedData);
        }
    };

    const handleArrayInputChange = (
        name: "physical_health_q4" | "physical_health_q6",
        value: string
    ) => {
        if (name === "physical_health_q4") {
            setTempQ4(value);
        } else {
            setTempQ6(value);
        }
    };

    const handleArrayInputSubmit = (
        name: "physical_health_q4" | "physical_health_q6"
    ) => {
        const value = name === "physical_health_q4" ? tempQ4 : tempQ6;
        if (value.trim()) {
            setData(name, [...data[name], value.trim()]);
            if (name === "physical_health_q4") {
                setTempQ4("");
            } else {
                setTempQ6("");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("paramedis.questioner.store", screening.id));
    };

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
            <form onSubmit={handleSubmit} className="space-y-8">
                <ol className="space-y-6 list-decimal list-inside">
                    <li>
                        <p className="font-medium mb-2">
                            {questions.physical_health_q1}
                        </p>
                        <div className="space-y-2">
                            {[
                                "Penyakit Jantung",
                                "Hipertensi (tekanan darah tinggi)",
                                "Hipotensi(tekanan darah rendah)",
                                "Diabetes",
                                "Masalah paru-paru lainnya",
                                "Cedera sendi/lutut/pergelangan kaki",
                                "Tidak ada dari yang disebutkan",
                            ].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`physical_health_q1-${option}`}
                                        checked={data.physical_health_q1.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "physical_health_q1",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`physical_health_q1-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.physical_health_q1 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.physical_health_q1}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.physical_health_q2}
                        </p>
                        <div className="space-y-2">
                            {[
                                "Kurang Dari 6 bulan yang lalu",
                                "6 bulan - 1 tahun lalu",
                                "Lebih dari 1 tahun lalu",
                                "Belum pernah melakukan",
                            ].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`physical_health_q2-${option}`}
                                        checked={data.physical_health_q2.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "physical_health_q2",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`physical_health_q2-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.physical_health_q2 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.physical_health_q2}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.physical_health_q3}
                        </p>
                        <div className="space-y-2">
                            {[
                                "Pernapasan saat berolahraga berat",
                                "Daya tahan tubuh saat melakukan aktivitas",
                                "Tidak ada masalah di atas",
                            ].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`physical_health_q2-${option}`}
                                        checked={data.physical_health_q3.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "physical_health_q3",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`physical_health_q3-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.physical_health_q3 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.physical_health_q3}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>
                    <li>
                        <p className="font-medium mb-2">
                            {questions.physical_health_q4}
                        </p>
                        <div className="space-y-2">
                            {["Ya", "Tidak"].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`physical_health_q6-${option}`}
                                        checked={data.physical_health_q4.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "physical_health_q4",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`physical_health_q4-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <Input
                                value={tempQ4}
                                onChange={(e) =>
                                    handleArrayInputChange(
                                        "physical_health_q4",
                                        e.target.value
                                    )
                                }
                                placeholder="Sebutkan.."
                            />
                            <Button
                                type="button"
                                onClick={() =>
                                    handleArrayInputSubmit("physical_health_q4")
                                }
                            >
                                Add
                            </Button>
                        </div>
                        <div className="mt-2">
                            {data.physical_health_q4.map((item, index) => (
                                <div
                                    key={index}
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        {errors.physical_health_q4 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.physical_health_q4}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.physical_health_q5}
                        </p>
                        <div className="space-y-2">
                            {["Sangat Baik", "Baik", "Cukup", "Buruk"].map(
                                (option) => (
                                    <div
                                        key={option}
                                        className="flex items-center space-x-2"
                                    >
                                        <Checkbox
                                            id={`physical_health_q2-${option}`}
                                            checked={data.physical_health_q5.includes(
                                                option
                                            )}
                                            onCheckedChange={() =>
                                                handleCheckboxChange(
                                                    "physical_health_q5",
                                                    option
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor={`physical_health_q5-${option}`}
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                )
                            )}
                        </div>
                        {errors.physical_health_q5 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.physical_health_q5}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.physical_health_q6}
                        </p>
                        <div className="space-y-2">
                            {["Ya", "Tidak"].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`physical_health_q6-${option}`}
                                        checked={data.physical_health_q6.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "physical_health_q6",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`physical_health_q6-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <Input
                                value={tempQ6}
                                onChange={(e) =>
                                    handleArrayInputChange(
                                        "physical_health_q6",
                                        e.target.value
                                    )
                                }
                                placeholder="Sebutkan.."
                            />
                            <Button
                                type="button"
                                onClick={() =>
                                    handleArrayInputSubmit("physical_health_q6")
                                }
                            >
                                Add
                            </Button>
                        </div>
                        <div className="mt-2">
                            {data.physical_health_q6.map((item, index) => (
                                <div
                                    key={index}
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        {errors.physical_health_q6 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.physical_health_q6}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.experience_knowledge_q1}
                        </p>
                        <div className="space-y-2">
                            {["Ya", "Tidak"].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`experience_knowledge_q1-${option}`}
                                        checked={data.experience_knowledge_q1.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "experience_knowledge_q1",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`experience_knowledge_q1-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.experience_knowledge_q1 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.experience_knowledge_q1}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.experience_knowledge_q2}
                        </p>
                        <div className="space-y-2">
                            {["Ya", "Tidak"].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`experience_knowledge_q2-${option}`}
                                        checked={data.experience_knowledge_q2.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "experience_knowledge_q2",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`experience_knowledge_q2-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.experience_knowledge_q2 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.experience_knowledge_q2}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.experience_knowledge_q3}
                        </p>
                        <div className="space-y-2">
                            {["Ya", "Tidak"].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`experience_knowledge_q3-${option}`}
                                        checked={data.experience_knowledge_q3.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "experience_knowledge_q3",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`experience_knowledge_q3-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.experience_knowledge_q3 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.experience_knowledge_q3}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.experience_knowledge_q4}
                        </p>
                        <div className="space-y-2">
                            {[
                                "Peta dan kompas/GPS",
                                "Pisau multi-fungsi",
                                "Kit pertolongan pertama",
                                "Lampu senter/headlamp",
                                "Tidak membawa atau tidak tahu cara menggunakannya",
                            ].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`experience_knowledge_q4-${option}`}
                                        checked={data.experience_knowledge_q4.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "experience_knowledge_q4",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`experience_knowledge_q4-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.experience_knowledge_q4 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.experience_knowledge_q4}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>

                    <li>
                        <p className="font-medium mb-2">
                            {questions.experience_knowledge_q5}
                        </p>
                        <div className="space-y-2">
                            {[
                                "Membawa pakaian waterproof dan windproof",
                                "Membawa pakaian berlapis untuk ketinggian",
                                "Membawa jas hujan atau ponco",
                                "Tidak tahu apa yang harus dibawa",
                            ].map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`experience_knowledge_q5-${option}`}
                                        checked={data.experience_knowledge_q5.includes(
                                            option
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(
                                                "experience_knowledge_q5",
                                                option
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`experience_knowledge_q5-${option}`}
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.experience_knowledge_q5 && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>
                                    {errors.experience_knowledge_q5}
                                </AlertDescription>
                            </Alert>
                        )}
                    </li>
                </ol>
                <Button type="submit" disabled={processing}>
                    {processing ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </ParamedisLayout>
    );
};

export default ScreeningQuestionnaire;
