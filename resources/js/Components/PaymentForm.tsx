import React from "react";
import { useForm } from "@inertiajs/react";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/Components/ui/form";

interface Screening {
    id: number;
    payment_status: boolean;
}

const formSchema = z.object({
    amount_paid: z.enum(["25000", "5000"]),
});

export default function PaymentForm({ screening }: { screening: Screening }) {
    const { post, processing } = useForm();
    const { toast } = useToast();

    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount_paid: "25000",
        },
    });

    const onSubmit = () => {
        const values = form.getValues(); // Mendapatkan nilai dari form
        post(route("cashier.payment.offline", screening.id), {
            data: values, // Hanya mengirim values
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Pembayaran Berhasil",
                    description: "Pembayaran telah dikonfirmasi.",
                });
                form.reset();
            },
            onError: (errors) => {
                toast({
                    title: "Pembayaran Gagal",
                    description: "Terjadi kesalahan saat memproses pembayaran.",
                    variant: "destructive",
                });
                Object.keys(errors).forEach((key) => {
                    form.setError(key as keyof z.infer<typeof formSchema>, {
                        type: "manual",
                        message: errors[key],
                    });
                });
            },
        });
    };

    return (
        <div className="w-full max-w-xs">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-center space-x-2"
                >
                    <FormField
                        control={form.control}
                        name="amount_paid"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormControl>
                                    <Select
                                        name="amount_paid"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={screening.payment_status}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih jumlah pembayaran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="25000">
                                                25000
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={screening.payment_status || processing}
                    >
                        {screening.payment_status
                            ? "Lunas"
                            : processing
                            ? "Proses..."
                            : "Bayar"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
