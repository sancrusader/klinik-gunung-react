// Halaman MedicalRecordPage.tsx
import React from "react";
import MedicalRecordDetail from "@/Components/MedicalRecordDetail";

// types/MedicalRecord.ts
export interface MedicalRecord {
    id: number;
    medical_notes: string;
    prescription?: string;
    examination_photo?: string;
}

export default function MedicalRecordPage({
    record,
}: {
    record: MedicalRecord; // Gunakan tipe yang diimpor
}) {
    return (
        <div className="py-12">
            <MedicalRecordDetail record={record} />
        </div>
    );
}
