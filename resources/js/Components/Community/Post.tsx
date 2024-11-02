import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Heart, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

const timeAgo = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval === 1 ? "" : "s"} ago`;
  return "just now";
};

const Post = ({ post }: { post: any }) => {
  return (
    <motion.div
      className="mb-8 border-b border-gray-200 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: post.id * 0.1 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <Avatar>
          <AvatarImage src={`/storage/${post.user.avatar}`} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">{post.user.name}</p>
          <p className="text-sm text-gray-500">{timeAgo(post.created_at)}</p>
        </div>
      </div>
      <p className="mb-4 text-lg text-gray-800">{post.content}</p>
      <div className="flex space-x-4">
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Heart className="w-5 h-5 mr-1" />
          <span>10</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <MessageCircle className="w-5 h-5 mr-1" />
          <span>10</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default Post;
