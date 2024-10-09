import React from "react";
import { useForm } from "@inertiajs/react";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
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
  amount_paid: z.enum(["25000", "50000"]),
  payment_method: z.enum(["cash", "qris", "transfer"]),
});

export default function PaymentForm({ screening }: { screening: Screening }) {
  const { post, processing } = useForm();

  const form = useHookForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount_paid: "25000",
      payment_method: "cash",
    },
  });

  const onSubmit = () => {
    const values = form.getValues();

    post(route("cashier.payment.offline", screening.id), {
      data: values,
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Pembayaran Berhasil", {
          description: "Pembayaran telah dikonfirmasi.",
        });
        form.reset();
      },
      onError: (errors) => {
        toast.error("Pembayaran Gagal", {
          description: "Terjadi kesalahan saat memproses pembayaran.",
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
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="amount_paid"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={screening.payment_status}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih jumlah pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25000">25000</SelectItem>
                      <SelectItem value="50000">50000</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={screening.payment_status}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih metode pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="qris">Qris</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
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
      <Toaster />
    </div>
  );
}
