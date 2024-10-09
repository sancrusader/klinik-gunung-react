import { FormEventHandler } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Head, useForm } from '@inertiajs/react';
import { Screening } from "@/types/screening";
import { Toaster, toast } from "sonner";

export default function Payment({ screening }: { screening: Screening }) {
  const { post, processing, data, setData, errors } = useForm({
    payment_method: "",
    amount_paid: "",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("cashier.payment.offline", screening.id), {
      data,
      preserveState: true,
      onSuccess: () => {
        toast.success("Pembayaran berhasil diproses.");
      },
      onError: () => {
        toast.error("Pembayaran gagal, silakan coba lagi.");
      },
    });
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Head title="Payment" />
      <Toaster />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Formulir Pembayaran untuk {screening.full_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="payment-method" className="text-base font-semibold">
                  Metode Pembayaran
                </Label>
                <RadioGroup
                  id="payment-method"
                  value={data.payment_method}
                  onValueChange={(value) => setData('payment_method', value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="qris" id="qris" />
                    <Label htmlFor="qris">QRIS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Tunai</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer">Transfer Bank</Label>
                  </div>
                </RadioGroup>
              </div>
              {errors.payment_method && (
                    <p className="text-sm text-red-500">
                    {errors.payment_method}
                </p>
                )}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-base font-semibold">
                  Pilih Harga
                </Label>
                <Select value={data.amount_paid} onValueChange={(value) => setData('amount_paid', value)}>
                  <SelectTrigger id="price">
                    <SelectValue placeholder="Pilih harga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50000">Rp 50.000</SelectItem>
                    <SelectItem value="100000">Rp 100.000</SelectItem>
                    <SelectItem value="150000">Rp 150.000</SelectItem>
                    <SelectItem value="200000">Rp 200.000</SelectItem>
                  </SelectContent>
                </Select>
                {errors.amount_paid && (
                    <p className="text-sm text-red-500">
                    {errors.amount_paid}
                </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit} disabled={processing}>
            {processing ? 'Memproses...' : 'Bayar Sekarang'}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
