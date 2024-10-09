// Page ini untuk menerima meninjau pada konten komunitas
import { PageProps } from "@/types";


export default function index({
    auth,
    communityPosts,
}: PageProps<{
    communityPosts?: {
        id: number;
        content: string;
        user: { name: string; avatar_url?: string };
        created_at: string;
    }[];
}>) {
    return (
        <>
        <div>
        {communityPosts?.map((post) => (
        <span>{post.user.name}</span>
        ))}
        </div>
        </>
    )
}
