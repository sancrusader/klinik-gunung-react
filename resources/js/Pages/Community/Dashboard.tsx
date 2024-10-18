import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Head,Link } from "@inertiajs/react";
import { PageProps } from "@/types";

import {
    Home,
    Search,
    PenSquare,
    Heart,
    User,
    Image as ImageIcon,
    MoreHorizontal,
    MessageCircle,
    Send,
} from "lucide-react";
import { motion } from "framer-motion";

const timeAgo = (date: string) => {
    const seconds = Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1)
        return `${interval} year${interval === 1 ? "" : "s"} ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1)
        return `${interval} month${interval === 1 ? "" : "s"} ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? "" : "s"} ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1)
        return `${interval} hour${interval === 1 ? "" : "s"} ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1)
        return `${interval} minute${interval === 1 ? "" : "s"} ago`;
    return "just now";
};
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
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
                {/* Header */}
                <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 border-b border-gray-800">
                    <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
                        <motion.svg
                            className="w-8 h-8"
                            viewBox="0 0 192 192"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <path d="M11.07 8.82S9.803 1.079 5.145 1.097C2.006 1.109.78 4.124 3.055 4.802c0 0-2.698.973-2.698 2.697 0 1.725 4.274 3.54 10.713 1.32zm1.931 5.924s.904 7.791 5.558 7.991c3.136.135 4.503-2.82 2.262-3.604 0 0 2.74-.845 2.82-2.567.08-1.723-4.105-3.737-10.64-1.82zm-3.672-1.55s-7.532 2.19-6.952 6.813c.39 3.114 3.53 3.969 3.93 1.63 0 0 1.29 2.559 3.002 2.351 1.712-.208 3-4.67.02-10.794zm5.623-2.467s7.727-1.35 7.66-6.008c-.046-3.138-3.074-4.333-3.728-2.051 0 0-1-2.686-2.726-2.668-1.724.018-3.494 4.312-1.206 10.727z" />
                        </motion.svg>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-6 h-6" />
                        </Button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow overflow-y-auto">
                    <div className="max-w-2xl mx-auto px-4 py-8">
                        {/* New Thread Form */}
                        {communityPosts?.map((post) => (
                            <motion.div
                                key={post.id}
                                className="mb-8 border-b border-gray-800 pb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: post.id * 0.1,
                                }}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <Avatar>
                                        <AvatarImage src={`/storage/${post.user.avatar}`} />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">
                                            {post.user.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {timeAgo(post.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <p className="mb-4 text-lg">{post.content}</p>
                                <div className="flex space-x-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 "
                                    >
                                        <Heart className="w-5 h-5 mr-1" />
                                        10
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 "
                                    >
                                        <MessageCircle className="w-5 h-5 mr-1" />
                                        10
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 "
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>

                {/* Bottom Navigation */}
                <nav className="sticky bottom-0 bg-gray-900/70 backdrop-blur-lg border-t border-gray-800">
                    <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
                        <Button
                            onClick={() =>
                                (window.location.href = route("dashboard"))
                            }
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 "
                        >
                            <Home className="w-6 h-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 "
                        >
                            <Search className="w-6 h-6" />
                        </Button>

                        <Link href={`/community/post`}>
                            <Button variant="ghost" size="icon" className="text-gray-400">
                            <PenSquare className="w-6 h-6" />
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 "
                        >
                            <Heart className="w-6 h-6" />
                        </Button>
                        <Link href={`/community/profile/${userid}`}>
                            <Button variant="ghost" size="icon" className="text-gray-400">
                                <User className="w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}
