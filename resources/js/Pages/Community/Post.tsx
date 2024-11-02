import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Head, useForm,Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Toaster, toast } from "sonner";
import {
  Image as ImageIcon,
  MoreHorizontal,
  X,
} from "lucide-react";

export default function CreatePost({ auth }: PageProps<{ user: { name: string; avatar: string } }>) {
  const [postContent, setPostContent] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    content: "",
    image_path: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.content.trim()) {
      toast.error("Silakan tulis postingan sebelum mengirim.");
      return;
    }

    post(route("community.store"), {
      onSuccess: () => {
        setPostContent("");
        toast.success("Post berhasil menunggu persetujuan");
      },
      onError: () => {
        toast.error("Failed to create post. Please try again.");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("image_path", e.target.files?.[0] || null);
  };

  return (
    <>
      <Head title="Create Post - Community klinik Gunung" />
      <Toaster />
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
            <Link href={route('community')}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </Button>
            </Link>
            <h1 className="text-lg font-semibold">New Post</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={`/storage/${auth.user.avatar}`} />
                  <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900">
                    {auth.user.name}
                  </p>
                  <Textarea
                    placeholder="Start a thread..."
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    className="w-full bg-transparent border border-gray-300 text-gray-900 placeholder-gray-500 resize-none mt-2 focus:ring-2 focus:ring-blue-500"
                    rows={5}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={!data.content.trim() || processing}
                >
                  Post
                </Button>
              </div>
            </form>
            {errors.content && (
              <p className="text-red-500 mt-2">
                {errors.content}
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
