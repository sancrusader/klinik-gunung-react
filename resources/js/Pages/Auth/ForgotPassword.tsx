import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { MailIcon } from 'lucide-react'

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <section className="flex items-center justify-center h-screen">
            <Head title="Forgot Password" />

            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10">
                        <MailIcon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email address and we'll send you a password reset link.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="name@example.com"
                                    autoFocus
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        <CardFooter className="flex justify-end px-0 mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>

            {status && (
                <Alert className="mt-4 border-green-500 bg-green-50 text-green-700">
                    <AlertDescription>{status}</AlertDescription>
                </Alert>
            )}
        </section>
    );
}
