import { useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Header from "@/Components/Community/Header";
import Post from "@/Components/Community/Post";
import Navigation from "@/Components/Community/Navigation";

export default function Community({
    auth,
    communityPosts,
    userid,
}: PageProps<{
    userid: number,
    communityPosts?: {
        id: number;
        content: string;
        user: { name: string; avatar?: string, uuid:number, };
        created_at: string;
    }[];
}>) {
    const [newThread, setNewThread] = useState("");

    const handleNewThread = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New thread:", newThread);
        setNewThread("");
    };

    return (
        <>
            <Head title="Community" />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow overflow-y-auto">
                    <div className="max-w-2xl mx-auto px-4 py-8">
                        {communityPosts?.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </main>
                <Navigation userid={userid} />
            </div>
        </>
    );
}
