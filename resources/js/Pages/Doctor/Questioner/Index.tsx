import { Head } from "@inertiajs/react";
import DoctorSidebar from "@/Layouts/Dashboard/DoctorSidebar";
import PageContainer from "@/Layouts/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PageProps } from "@/types";
import { Screening } from "@/types/screening";

function capitalizeName(name: string): string {
    return name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
interface Questions {
    [key: string]: string;
}

interface Props extends PageProps {
    screening: Screening;
    questions: Questions;
}

export default function QuestionerDetail({
    auth,
    screening,
    questions,
}: Props) {
    return (
        <DoctorSidebar header={'Offline Screening'}>
            <PageContainer>
                <Head title="Detail Questioner" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Detail Questioner{" "}
                                    {capitalizeName(screening.full_name)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Menampilkan Informasi User */}
                                    {screening.full_name ? (
                                        <>
                                            <div className="border-b py-4">
                                                <p className="font-medium text-gray-700">
                                                    Nama:
                                                </p>
                                                <p className="text-gray-900">
                                                    {capitalizeName(
                                                        screening.full_name
                                                    )}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <p>
                                            User information is not available.
                                        </p>
                                    )}

                                    {/* Menampilkan Jawaban Kuisioner */}
                                    {Object.keys(questions).map((key) => (
                                        <div
                                            key={key}
                                            className="border-b py-4"
                                        >
                                            <p className="font-medium text-gray-700">
                                                {questions[key]}
                                            </p>
                                            <p className="text-gray-900">
                                                {
                                                    screening[
                                                        key as keyof Screening
                                                    ] as string
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </PageContainer>
        </DoctorSidebar>
    );
}
