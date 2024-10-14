import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { ArrowLeft, MoreHorizontal, Link as LinkIcon, Settings } from "lucide-react"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("threads")
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Profile</h1>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-400">@johndoe</p>
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg?text=JD" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <p className="mb-4">Web developer, coffee enthusiast, and amateur photographer. Sharing my journey and thoughts on Threads.</p>
        <div className="flex items-center text-gray-400 mb-6">
          <LinkIcon className="w-4 h-4 mr-2" />
          <a href="https://johndoe.com" className="text-blue-400 hover:underline">johndoe.com</a>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <p><span className="font-semibold">1.2k</span> followers</p>
          <p><span className="font-semibold">500</span> following</p>
        </div>
        <div className="flex space-x-4">
          <Button className="flex-1" onClick={handleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button variant="outline" className="flex-1">
            Mention
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-2xl mx-auto px-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          {[1, 2, 3].map((thread) => (
            <div key={thread} className="border-b border-gray-800 py-4">
              <p className="mb-2">This is a sample thread by John Doe. It's a great way to share thoughts and ideas!</p>
              <div className="flex items-center text-gray-400 text-sm">
                <span className="mr-4">2h ago</span>
                <span className="mr-4">42 likes</span>
                <span>5 replies</span>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="replies">
          {[1, 2].map((reply) => (
            <div key={reply} className="border-b border-gray-800 py-4">
              <p className="text-gray-400 mb-2">Replying to @someuser</p>
              <p className="mb-2">This is a sample reply by John Doe. Engaging in conversations and sharing perspectives!</p>
              <div className="flex items-center text-gray-400 text-sm">
                <span className="mr-4">1h ago</span>
                <span className="mr-4">15 likes</span>
                <span>2 replies</span>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
