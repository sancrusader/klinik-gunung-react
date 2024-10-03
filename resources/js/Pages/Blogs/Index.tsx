import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types"; // Pastikan jalur ini benar

// Definisi tipe Blog
export interface Blog {
    id: number;
    title: string;
    content: string;
    image_path: string | null;
    created_at: string;
    updated_at: string;
}

// Definisi Props untuk komponen Index
interface Props extends PageProps {
    blogs: Blog[]; // Pastikan untuk mendefinisikan tipe untuk blogs
}

export default function Index({ blogs }: Props) {
    return (
        <>
            <Head title="Blogs" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link
                        href="/blogs/create"
                        className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Create New Blog
                    </Link>
                    {/* Cek apakah blogs tidak kosong sebelum mapping */}
                    {blogs.length > 0 ? (
                        blogs.map((blog: Blog) => (
                            <Card key={blog.id} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{blog.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {blog.image_path && (
                                        <img
                                            src={`/storage/${blog.image_path}`}
                                            alt={blog.title}
                                            className="mb-4"
                                        />
                                    )}
                                    <p>{blog.content}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p>No blogs found.</p> // Pesan jika tidak ada blog
                    )}
                </div>
            </div>
        </>
    );
}
