import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { PageProps } from "@/types";
import { Toaster, toast } from "sonner";

import {
  Image as ImageIcon,
  Link,
  AtSign,
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
    post(route("community.store"), {
      onSuccess: () => {
        setPostContent("");
        toast.success("Post behasil menunggu persetujuan");
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 border-b border-gray-800">
          <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <X className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold">New Post</h1>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="flex items-start space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={`/storage/${auth.user.avatar}`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">
                    {auth.user.name}
                  </p>
                  <Textarea
                    placeholder="Start a thread..."
                    value={data.content}
                    onChange={(e) =>
                      setData("content", e.target.value)
                    }
                    className="w-full bg-transparent border-none text-white placeholder-gray-500 resize-none mt-2"
                    rows={5}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-400"
                  >
                    <ImageIcon className="w-6 h-6" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-400"
                  >
                    <Link className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-400"
                  >
                    <AtSign className="w-6 h-6" />
                  </Button>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={
                    !data.content.trim() || processing
                  }
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
