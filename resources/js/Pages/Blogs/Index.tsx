import { Link,Head } from "@inertiajs/react";
import { Sheet, SheetTrigger, SheetContent } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import Header from "@/Layouts/Header";
import { PageProps } from "@/types";

export interface Blog {
    id: number;
    title: string;
    content: string;
    image_path: string | null;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    blogs: Blog[];
}

export default function Index({ blogs }: Props) {
    return (
        <Header>
            <Head title="Blog"/>
            <main className="flex-1">
                <section className="py-12 md:py-16 lg:py-20">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-6 md:space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Blog</h2>
                                <p className="text-muted-foreground">Check out the latest articles from our blog.</p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {blogs.length > 0 ? (
                                    blogs.map((blog: Blog) => (
                                        <Link
                                            key={blog.id}
                                            href={`/blogs/${blog.id}`}
                                            className="group grid h-auto w-full justify-start gap-4 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            <div className="aspect-video overflow-hidden rounded-lg">
                                                <img
                                                    src={blog.image_path || "/placeholder.svg"}
                                                    width={400}
                                                    height={225}
                                                    alt={blog.title}
                                                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                                                    style={{ aspectRatio: "400/225", objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                                                    {blog.title}
                                                </h3>
                                                <p className="line-clamp-2 text-muted-foreground">
                                                    {blog.content.length > 100
                                                        ? `${blog.content.substring(0, 100)}...`
                                                        : blog.content}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No blogs available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Header>
    );
}
