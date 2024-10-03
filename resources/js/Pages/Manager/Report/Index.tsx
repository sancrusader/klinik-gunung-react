import React from "react";
import { useForm } from "@inertiajs/react";

// Definisikan tipe data untuk form
interface ReportFormData {
    periode: "weekly" | "monthly"; // Tipe data untuk periode
}

const ReportPeriodSelection: React.FC = () => {
    const { data, setData } = useForm<ReportFormData>({
        periode: "weekly", // Set default value
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Buat URL untuk mengunduh PDF
        const url = route("manager.report.pdf", { periode: data.periode });

        // Buka URL di tab baru
        window.open(url, "_blank");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pilih Periode Laporan</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="periode" className="block mb-2">
                    Periode:
                </label>
                <select
                    name="periode"
                    id="periode"
                    value={data.periode}
                    onChange={(e) =>
                        setData(
                            "periode",
                            e.target.value as "weekly" | "monthly"
                        )
                    }
                    className="border rounded px-2 py-1 mb-4"
                >
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Generate PDF
                </button>
            </form>
        </div>
    );
};

export default ReportPeriodSelection;
