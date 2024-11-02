import { PageProps } from "@/types";
import { useForm, router } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import AdminSidebar from "@/Layouts/Dashboard/AdminSidebar";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Head } from "@inertiajs/react";

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

    // Form untuk menolak postingan
    const { post: rejectPost } = useForm({
        status: "reject",
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

    // Handle menolak postingan

    // Handle menghapus postingan
    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
            // Menggunakan metode delete
            router.delete(route("community.destroy", { id }), {
                onSuccess: () => {
                    toast.success("Postingan telah dihapus!");
                },
                onError: () => {
                    toast.error("Gagal menghapus postingan.");
                }
            });
        }
    };

    return (
        <AdminSidebar header={'Community'}>
            <Head title="Community List" />
            <Toaster />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {communityPosts?.map((post) => (
                    <Card key={post.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`/storage/${post.user.avatar}`} alt={post.user.name} />
                                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{post.user.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{post.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Badge variant={post.status === 'approve' ? 'default' : 'secondary'}>
                                {post.status === 'approve' ? 'Diterima' : 'Pending'}
                            </Badge>
                            {post.status === 'pending' && (
                                <>
                                    <Button onClick={() => handleApprove(post.id)}>
                                        Izinkan
                                    </Button>
                                </>
                            )}
                            <Button onClick={() => handleDelete(post.id)} variant="destructive">
                                Hapus
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AdminSidebar>
    );
}
