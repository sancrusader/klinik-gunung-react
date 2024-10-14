import React, { useState,FormEvent  } from 'react';
import { useForm } from "@inertiajs/react";
import { Toaster, toast } from 'sonner';


export default function Category() {

    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("category.store"), {
            onSuccess: () => {
                toast.success(`Category ${data.name} berhasil dibuat`);
            },
            onError: (errors) => {
                toast.error("Failed to submit category. Please check the errors and try again.");
                console.error(errors);
            },
        });
    };

    return (
        <div>
            <h2>Create Category</h2>
            <Toaster position="top-center"/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name",e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
