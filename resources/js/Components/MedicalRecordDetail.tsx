import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { UserIcon } from "lucide-react";

// Definisikan tipe untuk medical record
interface MedicalRecord {
    id: number;
    medical_notes: string;
    prescription?: string;
    examination_photo?: string;
    patient_name?: string;
}

export default function MedicalRecordDetail({
    record,
}: {
    record: MedicalRecord;
}) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Medical Record Detail</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    {record.patient_name}
                </div>
                <div>
                    <Label className="text-lg font-semibold">
                        Medical Notes
                    </Label>
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                        {record.medical_notes}
                    </p>
                </div>

                {record.prescription && (
                    <div>
                        <Label className="text-lg font-semibold">
                            Prescription
                        </Label>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                            {record.prescription}
                        </p>
                    </div>
                )}

                {record.examination_photo && (
                    <div>
                        <Label className="text-lg font-semibold">
                            Examination Photo
                        </Label>
                        <img
                            src={record.examination_photo}
                            alt="Examination Photo"
                            className="mt-2 max-w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
