import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { PageProps } from '../../types';

export default function Create({auth}:PageProps) {
    const { data, setData, post } = useForm({
        title: "",
        content: "",
        image: null as File | null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/blog/post", {
            data: {
                title: data.title,
                content: data.content,
                image: data.image,
            },
        });
    };

    return (
        <>
            <Head title="Create Blog" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="content"
                                className="block text-gray-700"
                            >
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="image"
                                className="block text-gray-700"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) =>
                                    setData("image", e.target.files![0])
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                accept="image/*"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Create Blog
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
