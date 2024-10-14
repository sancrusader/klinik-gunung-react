import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Select } from "@/Components/ui/select";
import {Toaster, toast} from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function CreateProduct({
    categories,
}: {
    categories: { id: number; name: string }[];
}) {
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        image: null as File | null,
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("products.store"),{
        onSuccess: () => {
            toast.success('Produk berhasil dibuat');
        },
        onError: (errors) => {
            setSuccessMessage(null);
            toast.error("Failed to submit produk form. Please check the errors and try again.");
            console.error(errors);
        },
 });
}
    return (
        <section className="py-12">
            <Head title="Create Product"/>
            <Toaster position="top-center"/>
            <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Create New Product
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Product Name
                                </label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                {errors.name && (
                                    <div className="text-red-600 text-sm">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                {errors.description && (
                                    <div className="text-red-600 text-sm">
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Price
                                </label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                {errors.price && (
                                    <div className="text-red-600 text-sm">
                                        {errors.price}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="stock"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Stock
                                </label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                {errors.stock && (
                                    <div className="text-red-600 text-sm">
                                        {errors.stock}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="category_id"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Category
                                </label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <div className="text-red-600 text-sm">
                                        {errors.category_id}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Product Image
                                </label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            "image",
                                            e.target.files?.[0] ?? null
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                {errors.image && (
                                    <div className="text-red-600 text-sm">
                                        {errors.image}
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="mt-4">
                                Create Product
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
