import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent } from "@/Components/ui/card";
import { MoreHorizontal, MessageCircle, Heart, Repeat, Share2 } from "lucide-react";
import Header from "@/Components/Community/Header";
import Navigation from "@/Components/Community/Navigation";

export default function Profile({
  auth,
  user,
  userid,
  posts,
}: PageProps<{
  userid: number;
  user: {
    id: number;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  posts: {
    user_id: number;
    id: number;
    content: string;
    created_at: string;
    likes: number;
    comments: number;
    reposts: number;
  }[];
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col">
      <Header />
      <Head title={`${user.name} (@${user.username})`} />
      <div className="min-h-screen bg-background text-foreground">
        <main className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar || '/default-avatar.png'} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <p className="mb-4">{user.bio || "No bio available."}</p>
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          </div>
          <div className="flex gap-4 mb-8">
            <Button className="flex-1">Edit</Button>
            {/* Uncomment to add mention button */}
            {/* <Button variant="outline" className="flex-1">Mention</Button> */}
          </div>
          {/* <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || '/default-avatar.png'} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="mt-3 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-5 w-5" />
                      <span className="ml-2 text-xs">{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Repeat className="h-5 w-5" />
                      <span className="ml-2 text-xs">{post.reposts}</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                      <span className="ml-2 text-xs">{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </main>
      </div>
      <Navigation userid={userid} />
    </div>
  );
}
