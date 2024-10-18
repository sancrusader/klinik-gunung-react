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
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";

interface Screening {
    id: string;
    full_name: string;
}

interface FormData {
    payment_method: string;
    amount_paid: string;
    quantity_product: string;
    product_price: string;
    payment_proof: File | null;
}

export default function PaymentForm({ screening }: { screening: Screening }) {
    const { post, processing, data, setData, errors } = useForm<FormData>({
        payment_method: "",
        amount_paid: "",
        quantity_product: "",
        product_price: "",
        payment_proof: null,
    });

    const [hasPurchasedProduct, setHasPurchasedProduct] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("cashier.payment.offline", screening.id), {
            preserveState: true,
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
                            <Label
                                htmlFor="payment-method"
                                className="text-base font-semibold"
                            >
                                Metode Pembayaran
                            </Label>
                            <RadioGroup
                                id="payment-method"
                                value={data.payment_method}
                                onValueChange={(value) =>
                                    setData("payment_method", value)
                                }
                                className="flex flex-col space-y-2"
                            >
                                {["qris", "cash", "transfer"].map((method) => (
                                    <div
                                        key={method}
                                        className="flex items-center space-x-2"
                                    >
                                        <RadioGroupItem
                                            value={method}
                                            id={method}
                                        />
                                        <Label htmlFor={method}>
                                            {method.toUpperCase()}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            {errors.payment_method && (
                                <p className="text-sm text-red-500">
                                    {errors.payment_method}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="price"
                                className="text-base font-semibold"
                            >
                                Pilih Harga
                            </Label>
                            <Select
                                value={data.amount_paid}
                                onValueChange={(value) =>
                                    setData("amount_paid", value)
                                }
                            >
                                <SelectTrigger id="price">
                                    <SelectValue placeholder="Pilih harga" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[50000, 100000, 150000, 200000].map(
                                        (price) => (
                                            <SelectItem
                                                key={price}
                                                value={price.toString()}
                                            >
                                                Rp{" "}
                                                {price.toLocaleString("id-ID")}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.amount_paid && (
                                <p className="text-sm text-red-500">
                                    {errors.amount_paid}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="buy-product"
                                checked={hasPurchasedProduct}
                                onCheckedChange={() =>
                                    setHasPurchasedProduct(!hasPurchasedProduct)
                                }
                            />
                            <Label
                                htmlFor="buy-product"
                                className="text-base font-semibold"
                            >
                                Apakah pasien membeli produk?
                            </Label>
                        </div>

                        {hasPurchasedProduct && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="product-name"
                                        className="text-base font-semibold"
                                    >
                                        Jumlah Product
                                    </Label>
                                    <Input
                                        type="number"
                                        id="product-name"
                                        value={data.quantity_product}
                                        onChange={(e) =>
                                            setData(
                                                "quantity_product",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="product-price"
                                        className="text-base font-semibold"
                                    >
                                        Total
                                    </Label>
                                    <Input
                                        type="number"
                                        id="product-price"
                                        value={data.product_price}
                                        onChange={(e) =>
                                            setData(
                                                "product_price",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {(data.payment_method === "qris" ||
                            data.payment_method === "transfer") && (
                            <div className="space-y-4">
                                <Label
                                    htmlFor="payment-proof"
                                    className="text-base font-semibold"
                                >
                                    Upload Bukti Pembayaran
                                </Label>
                                <Input
                                    type="file"
                                    id="payment-proof"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {errors.payment_proof && (
                                    <p className="text-sm text-red-500">
                                        {errors.payment_proof}
                                    </p>
                                )}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing ? "Memproses..." : "Bayar Sekarang"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
