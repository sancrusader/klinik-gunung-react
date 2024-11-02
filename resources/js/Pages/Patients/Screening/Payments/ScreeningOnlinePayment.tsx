import { FormEventHandler, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

interface Screening {
    id: string;
    full_name: string;
}

interface FormData {
    payment_method: string;
    amount_paid: string;
    payment_proof: File | null;
}

export default function PaymentForm({ screening }: { screening: Screening }) {
    const { post, processing, data, setData, errors } = useForm<FormData>({
        payment_method: "",
        amount_paid: "",
        payment_proof: null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if ((data.payment_method === "qris" || data.payment_method === "transfer") && !data.payment_proof) {
            toast.error("Bukti pembayaran diperlukan untuk metode ini.");
            return;
        }

        post(route("payments.screening.online", screening.id), {
            preserveState: true,
            data: {
                payment_method: data.payment_method,
                amount_paid: data.amount_paid,
                payment_proof: data.payment_proof,
            },
            onSuccess: () => toast.success("Pembayaran berhasil diproses."),
            onError: () => toast.error("Pembayaran gagal, silakan coba lagi."),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("payment_proof", file);
    };

    return (
        <section className="flex h-screen items-center justify-center bg-gray-100">
            <Head title="Payment" />
            <Toaster />
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Formulir Pembayaran untuk {screening.full_name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="payment-method" className="text-base font-semibold">
                                Metode Pembayaran
                            </Label>
                            <RadioGroup
                                id="payment-method"
                                value={data.payment_method}
                                onValueChange={(value) => setData("payment_method", value)}
                                className="flex flex-col space-y-2"
                            >
                                {["qris", "cash", "transfer"].map((method) => (
                                    <div key={method} className="flex items-center space-x-2">
                                        <RadioGroupItem value={method} id={method} />
                                        <Label htmlFor={method}>{method.toUpperCase()}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            {errors.payment_method && (
                                <p className="text-sm text-red-500">{errors.payment_method}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-base font-semibold">
                                Harga Screening
                            </Label>
                            <Select
                                value={data.amount_paid}
                                onValueChange={(value) => setData("amount_paid", value)}
                            >
                                <SelectTrigger id="price">
                                    <SelectValue placeholder="Pilih harga" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[50000, 100000, 150000, 200000].map((price) => (
                                        <SelectItem key={price} value={price.toString()}>
                                            Rp {price.toLocaleString("id-ID")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.amount_paid && <p className="text-sm text-red-500">{errors.amount_paid}</p>}
                        </div>

                        {(data.payment_method === "qris" || data.payment_method === "transfer") && (
                            <div className="space-y-4">
                                <Label htmlFor="payment-proof" className="text-base font-semibold">
                                    Upload Bukti Pembayaran
                                </Label>
                                <Input type="file" id="payment-proof" accept="image/*" onChange={handleFileChange} />
                                {errors.payment_proof && (
                                    <p className="text-sm text-red-500">{errors.payment_proof}</p>
                                )}
                            </div>
                        )}

                        {data.amount_paid && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Rincian Pembayaran</h3>
                                <p>Harga Screening: Rp {parseInt(data.amount_paid).toLocaleString("id-ID")}</p>
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? "Memproses..." : "Bayar Sekarang"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
