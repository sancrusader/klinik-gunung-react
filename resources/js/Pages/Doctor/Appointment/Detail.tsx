import MedicalRecordDetail from "@/Components/MedicalRecordDetail";
import DoctorSidebar from "@/Layouts/Dashboard/DoctorSidebar";
export interface MedicalRecord {
    id: number;
    medical_notes: string;
    prescription?: string;
    examination_photo?: string;
}

export default function MedicalRecordPage({
    record,
}: {
    record: MedicalRecord;
}) {
    return (
        <DoctorSidebar header={'Medical Record'}>
        <div className="py-12">
            <MedicalRecordDetail record={record} />
        </div>
        </DoctorSidebar>
    );
}
