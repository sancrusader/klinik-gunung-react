'use client'

import { useState, useEffect } from "react"
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import { Link, useForm, usePage } from "@inertiajs/react"
import { PageProps } from "@/types"
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar"
import { Input } from "@/Components/ui/input"
import { toast, Toaster } from 'sonner'

interface User {
  name: string
  email: string
  avatar?: string
  email_verified_at: string | null
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean
    status?: string
    className?: string
}) {
    const user = usePage<PageProps>().props.auth.user as User

    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        avatar: null as File | null,
    })

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    // Handle avatar URL based on different sources
    const getAvatarUrl = () => {
        if (avatarPreview) {
            return avatarPreview
        }
        if (user.avatar) {
            if (user.avatar.includes('googleusercontent.com')) {
                return user.avatar
            }
            // Handle other external URLs
            if (user.avatar.startsWith('http') || user.avatar.startsWith('https')) {
                return user.avatar
            }
            // Handle local storage URLs
            return `/storage/${user.avatar}`
        }
        return null
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setData("avatar", file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        if (data.avatar) {
            formData.append('avatar', data.avatar)
        }

        post(route("profile.update"), {
            data: formData,
            preserveState: false,
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success('Profile updated successfully')
            },
        })
    }

    // Cleanup preview URL on unmount
    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview)
            }
        }
    }, [avatarPreview])

    return (
        <section className={className}>
            <Toaster />
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src={getAvatarUrl() || ''}
                                alt={`${user.name}'s avatar`}
                                onError={(e) => {
                                    // Handle image load errors
                                    e.currentTarget.src = ''
                                }}
                            />
                            <AvatarFallback>
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </AvatarFallback>
                        </Avatar>

                        <Input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="max-w-[250px]"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="mt-4">
                            <p className="text-sm mt-2 text-gray-800">
                                Your email address is unverified.{' '}
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>
                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </section>
    )
}
