import React, { useState, FormEvent } from "react";
import { useForm, Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Input } from "@/Components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import { Toaster, toast } from "sonner";
import { PageProps } from "@/types";
import AdminSidebar from "@/Layouts/Dashboard/AdminSidebar";
type FormData = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export default function Create({auth}:PageProps) {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const initialData: FormData = {
        name: "",
        email: "",
        password: "",
        role: "",
    };

    const { data, setData, post, processing, errors } = useForm<FormData>(initialData);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                toast.success(`User ${data.name} berhasil ditambahkan!`);
                setData(initialData);
            },
            onError: (errors) => {
                setSuccessMessage(null);
                toast.error("Gagal menambahkan user. Silakan periksa kesalahan dan coba lagi.");
                console.error(errors);
            },
        });
    };

    return (
        <AdminSidebar header={'Create Users'}>
            <Head title="Tambah User" />
            <Toaster position="top-center"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tambah User</CardTitle>
                            <CardDescription>
                                Silakan isi form di bawah ini untuk menambah user baru.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {successMessage && (
                                <Alert className="mb-4">
                                    <AlertDescription>
                                        {successMessage}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="full_name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-500">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={data.role}
                                            onChange={(e) => setData("role", e.target.value)}
                                            className="border rounded-md p-2 w-full"
                                        >
                                            <option value="">Pilih Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="paramedis">Paramedic</option>
                                            <option value="cashier">Cashier</option>
                                            <option value="doctor">Doctor</option>
                                        </select>
                                        {errors.role && (
                                            <p className="text-sm text-red-500">
                                                {errors.role}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing ? "Submitting..." : "Tambah User"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminSidebar>
    );
}
