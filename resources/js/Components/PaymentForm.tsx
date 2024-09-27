import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

// Definisikan tipe untuk screening
interface Screening {
    id: number;
    full_name: string;
    queue_number: number;
    payment_status: boolean; // Pastikan ada field payment_status
}

const PaymentForm: React.FC<{ screening: Screening }> = ({ screening }) => {
    const { data, setData, post, processing } = useForm({
        amount_paid: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("cashier.payment.offline", screening.id));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    htmlFor="amount_paid"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    Jumlah Pembayaran
                </label>
                <input
                    type="number"
                    name="amount_paid"
                    id="amount_paid"
                    value={data.amount_paid}
                    onChange={(e) => setData("amount_paid", e.target.value)}
                    required
                    className="block w-full p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Masukkan jumlah pembayaran"
                />
            </div>
            <button
                type="submit"
                disabled={screening.payment_status || processing}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${
                    screening.payment_status
                        ? "bg-gray-500"
                        : "bg-primary-700 hover:bg-primary-800"
                } focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            >
                {screening.payment_status
                    ? "Pembayaran Dikonfirmasi"
                    : "Konfirmasi Pembayaran"}
            </button>
        </form>
    );
};

export default PaymentForm;
