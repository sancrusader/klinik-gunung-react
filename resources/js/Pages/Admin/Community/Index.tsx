import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { Toaster, toast } from "sonner";

export default function Index({
    auth,
    communityPosts,
}: PageProps<{
    communityPosts?: {
        id: number;
        content: string;
        image_path: string;
        status: string;
        user: { name: string; avatar?: string };
        created_at: string;
    }[];
}>) {

    // Form untuk mengizinkan postingan
    const { post: approvePost } = useForm({
        status: "approve",
    });

    // Handle izin postingan
    const handleApprove = (id: number) => {
        if (confirm("Apakah Anda yakin ingin mengizinkan postingan ini?")) {
            approvePost(route("community.approve", { id }), {
                onSuccess: () => {
                    toast.success("Postingan telah diizinkan!");
                },
                onError: () => {
                    toast.error("Gagal mengizinkan postingan.");
                }
            });
        }
    };

    return (
        <>
            <Toaster />
            <div className="community-list">
                {communityPosts?.map((post) => (
                    <div key={post.id} className="post-item border p-4 mb-4">
                        <div className="flex items-center mb-2">
                            <img src={`/storage/${post.user.avatar}`} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                            <span className="font-bold">{post.user.name}</span>
                        </div>
                        <div className="content mb-2">{post.content}</div>
                        <div className="status mb-2">
                            <span className={`status-${post.status === 'terima' ? 'approved' : 'pending'}`}>
                                Status: {post.status === 'terima' ? 'Diterima' : 'Pending'}
                            </span>
                        </div>
                        {post.status === 'pending' && (
                            <button
                                className="bg-blue-500 text-white py-1 px-3 rounded"
                                onClick={() => handleApprove(post.id)}
                            >
                                Izinkan
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
