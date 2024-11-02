'use client'

import { FormEventHandler, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Alert, AlertDescription } from "@/Components/ui/alert"

export default function ResetPassword({ token, email }: { token: string; email: string }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })

  const [isSuccess, setIsSuccess] = useState(false)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('password.store'), {
      onSuccess: () => {
        reset('password', 'password_confirmation')
        setIsSuccess(true)
      },
    })
  }

  return (
    <section className="flex items-center justify-center h-screen">
        <Head title='Reset Password'/>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                disabled
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm New Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">{errors.password_confirmation}</p>
              )}
            </div>
          </div>
          <CardFooter className="flex justify-end mt-6 px-0">
            <Button type="submit" disabled={processing}>
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      {isSuccess && (
        <Alert className="mt-4">
          <AlertDescription>
            Your password has been reset successfully. You can now log in with your new password.
          </AlertDescription>
        </Alert>
      )}
    </Card>
    </section>
  )
}
