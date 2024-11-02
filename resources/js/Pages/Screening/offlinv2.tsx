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
    CardFooter,
} from "@/Components/ui/card";
import { Toaster, toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Progress } from "@/Components/ui/progress";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { User, Calendar, Phone, Clipboard, Activity, HelpCircle,Mail } from "lucide-react";
import PageContainer from "@/Layouts/PageContainer";

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
    [key: string]: string | string[];
};

const Offline: React.FC<{
    screening: Screening;
    questions: Questions;
    auth: Auth;
}> = ({ screening, questions, auth }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 4; // Personal Info, Health, Experience, Review

    const initialData: FormData = {
        full_name: "",
        age: "",
        email: "",
        gender: "",
        contact_number: "",
        planned_hiking_date: "",
        previous_hikes_count: "",
        ...Object.keys(questions).reduce(
            (acc, key) => ({ ...acc, [key]: [] }),
            {} as { [key: string]: string[] }
        ),
    };

    const { data, setData, post, processing, errors } = useForm<FormData>(initialData);
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
                toast.success(`Screening for ${data.full_name} Successfully Created!`);
            },
            onError: () => {
                toast.error("Failed to submit screening form. Please check the errors and try again.");
                console.error(errors);
            },
        });
    };

    const renderQuestion = (questionKey: keyof Questions, options: string[]) => (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="text-lg">{questions[questionKey]}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${questionKey}-${option}`}
                                checked={(data[questionKey] as string[]).includes(option)}
                                onCheckedChange={() => handleCheckboxChange(questionKey, option)}
                            />
                            <Label htmlFor={`${questionKey}-${option}`}>{option}</Label>
                        </div>
                    ))}
                </div>
            </CardContent>
            {errors[questionKey] && (
                <CardFooter>
                    <Alert variant="destructive">
                        <AlertDescription>{errors[questionKey]}</AlertDescription>
                    </Alert>
                </CardFooter>
            )}
        </Card>
    );

    const renderArrayInputQuestion = (questionKey: keyof Questions) => (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="text-lg">{questions[questionKey]}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {["Yes", "No"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${questionKey}-${option}`}
                                checked={(data[questionKey] as string[]).includes(option)}
                                onCheckedChange={() => handleCheckboxChange(questionKey, option)}
                            />
                            <Label htmlFor={`${questionKey}-${option}`}>{option}</Label>
                        </div>
                    ))}
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    <Input
                        value={tempInputs[questionKey] || ""}
                        onChange={(e) => handleArrayInputChange(questionKey, e.target.value)}
                        placeholder="Please specify..."
                    />
                    <Button type="button" onClick={() => handleArrayInputSubmit(questionKey)}>
                        Add
                    </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {(data[questionKey] as string[]).map((item, index) => (
                        <span key={index} className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                            {item}
                        </span>
                    ))}
                </div>
            </CardContent>
            {errors[questionKey] && (
                <CardFooter>
                    <Alert variant="destructive">
                        <AlertDescription>{errors[questionKey]}</AlertDescription>
                    </Alert>
                </CardFooter>
            )}
        </Card>
    );

    return (
        <Sidebar header={'Hiking Screening Form'}>
            <Head title="Hiking Health Screening" />
            <PageContainer>
            <Toaster position="top-center" />
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Hiking Health Screening</CardTitle>
                            <CardDescription>
                                Please complete this form to assess your readiness for hiking. Your health and safety are our top priorities.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={(currentStep / totalSteps) * 100} className="mb-4" />
                            <form onSubmit={handleSubmit}>
                                <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
                                    <TabsList className="grid w-full grid-cols-4">
                                        <TabsTrigger value="0" disabled={currentStep < 0}>Personal Info</TabsTrigger>
                                        <TabsTrigger value="1" disabled={currentStep < 1}>Health</TabsTrigger>
                                        <TabsTrigger value="2" disabled={currentStep < 2}>Experience</TabsTrigger>
                                        <TabsTrigger value="3" disabled={currentStep < 3}>Review</TabsTrigger>
                                    </TabsList>
                                    <ScrollArea className="h-[60vh] mt-4 rounded-md border p-4">
                                        <TabsContent value="0">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="full_name">Full Name</Label>
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            id="full_name"
                                                            type="text"
                                                            name="full_name"
                                                            placeholder="johndoe"
                                                            value={data.full_name}
                                                            onChange={(e) => setData("full_name", e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <div className="flex items-center space-x-2">

                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            placeholder="yourname@example.com"
                                                            value={data.email}
                                                            onChange={(e) => setData("email", e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="age">Age</Label>
                                                    <Input
                                                        id="age"
                                                        type="number"
                                                        name="age"
                                                        value={data.age}
                                                        placeholder="18"
                                                        onChange={(e) => setData("age", e.target.value)}
                                                    />
                                                    {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="gender">Gender</Label>
                                                    <Select
                                                        name="gender"
                                                        value={data.gender}
                                                        onValueChange={(value) => setData("gender", value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="contact_number">Contact Number</Label>
                                                    <div className="flex items-center space-x-2">

                                                        <Input
                                                            id="contact_number"
                                                            type="tel"
                                                            name="contact_number"
                                                            placeholder="0851626669347"
                                                            value={data.contact_number}
                                                            onChange={(e) => setData("contact_number", e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.contact_number && <p className="text-sm text-destructive">{errors.contact_number}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="planned_hiking_date">Planned Hiking Date</Label>
                                                    <div className="flex items-center space-x-2">

                                                        <Input
                                                            id="planned_hiking_date"
                                                            type="date"
                                                            name="planned_hiking_date"
                                                            value={data.planned_hiking_date}
                                                            onChange={(e) => setData("planned_hiking_date", e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.planned_hiking_date && <p className="text-sm text-destructive">{errors.planned_hiking_date}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="previous_hikes_count">Number of Previous Hikes (mdpl)</Label>
                                                    <div className="flex items-center space-x-2">

                                                        <Input
                                                            id="previous_hikes_count"
                                                            type="number"
                                                            name="previous_hikes_count"
                                                            placeholder="1000"
                                                            value={data.previous_hikes_count}
                                                            onChange={(e) => setData("previous_hikes_count", e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.previous_hikes_count && <p className="text-sm text-destructive">{errors.previous_hikes_count}</p>}
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="1">
                                            {renderQuestion("physical_health_q1", [
                                                "Heart disease",
                                                "Hypertension (high blood pressure)",
                                                "Hypotension (low blood pressure)",
                                                "Diabetes",
                                                "Other lung problems",
                                                "Joint/knee/ankle injury",
                                                "None of the above",
                                            ])}
                                            {renderQuestion("physical_health_q2", [
                                                "Less than 6 months ago",
                                                "6 months - 1 year ago",
                                                "More than 1 year ago",
                                                "Never done before",
                                            ])}
                                            {renderQuestion("physical_health_q3", [
                                                "Breathing during heavy exercise",
                                                "Body endurance during activities",
                                                "No issues mentioned above",
                                            ])}
                                            {renderArrayInputQuestion("physical_health_q4")}
                                            {renderQuestion("physical_health_q5", [
                                                "Very Good",
                                                "Good",
                                                "Fair",
                                                "Poor",
                                            ])}
                                            {renderArrayInputQuestion("physical_health_q6")}
                                        </TabsContent>
                                        <TabsContent value="2">
                                            {renderQuestion("experience_knowledge_q1", ["Yes", "No"])}
                                            {renderQuestion("experience_knowledge_q2", ["Yes", "No"])}
                                            {renderQuestion("experience_knowledge_q3", ["Yes", "No"])}
                                            {renderQuestion("experience_knowledge_q4", [
                                                "Map and compass/GPS",
                                                "Multi-function knife",
                                                "First aid kit",
                                                "Flashlight/headlamp",

                                                "Don't bring or don't know how to use them",
                                            ])}
                                            {renderQuestion("experience_knowledge_q5", [
                                                "Bring waterproof and windproof clothing",
                                                "Bring layered clothing for altitude",
                                                "Bring rain jacket or poncho",
                                                "Don't know what to bring",
                                            ])}
                                        </TabsContent>
                                        <TabsContent value="3">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Review Your Information</CardTitle>
                                                    <CardDescription>Please review your answers before submitting.</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-4">
                                                        <div>
                                                            <dt className="font-semibold">Full Name:</dt>
                                                            <dd>{data.full_name}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-semibold">Email:</dt>
                                                            <dd>{data.email}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-semibold">Age:</dt>
                                                            <dd>{data.age}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-semibold">Gender:</dt>
                                                            <dd>{data.gender}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-semibold">Contact Number:</dt>
                                                            <dd>{data.contact_number}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-semibold">Planned Hiking Date:</dt>
                                                            <dd>{data.planned_hiking_date}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </ScrollArea>
                                </Tabs>
                                <div className="mt-6 flex justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                        disabled={currentStep === 0}
                                    >
                                        Previous
                                    </Button>
                                    {currentStep < totalSteps - 1 ? (
                                        <Button
                                            type="button"
                                            onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <Button type="submit" disabled={processing}>
                                            {processing ? "Submitting..." : "Submit"}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    </PageContainer>
        </Sidebar>
    );
};

export default Offline;
