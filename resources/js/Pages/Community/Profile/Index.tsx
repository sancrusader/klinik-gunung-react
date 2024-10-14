import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Home, Search, PenSquare, Heart, User, Camera, Edit, Menu } from "lucide-react"
import { PageProps } from "@/types";

export default function ProfilePage({ user }: PageProps<{
    user?: {
        name: string,
        avatar: string,
    }
    communityPosts?: {
        id: number;
        content: string;
        user: { name: string; avatar?: string, uuid: number };
        created_at: string;
    }[];
}>) {
  const [activeTab, setActiveTab] = useState("threads")
  const [newThread, setNewThread] = useState('')

  const handleNewThread = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New thread:', newThread)
    setNewThread('')
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
          <svg className="w-8 h-8" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" fill="black"/>
          </svg>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">sandi.fullstack</p>
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg?text=SF" />
            <AvatarFallback>SF</AvatarFallback>
          </Avatar>
        </div>
        <p className="mb-4"><span className="font-semibold">0</span> pengikut</p>
        <Button className="w-full" variant="outline">Edit profil</Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-2xl mx-auto px-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="balasan">Balasan</TabsTrigger>
          <TabsTrigger value="ulang">Postingan Ulang</TabsTrigger>
        </TabsList>
        <TabsContent value="threads" className="mt-4">
          <form onSubmit={handleNewThread} className="mb-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?text=SF" />
                <AvatarFallback>SF</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <Input
                  placeholder="Apa yang baru?"
                  value={newThread}
                  onChange={(e) => setNewThread(e.target.value)}
                  className="w-full bg-transparent border-none resize-none focus:ring-0"
                />
                <div className="flex justify-end mt-2">
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                    Kirim
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Selesaikan profil Anda</h2>
            <p className="text-gray-600">3 tersisa</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Tambahkan foto profil</h3>
                <p className="text-sm text-gray-600">Permudah orang untuk mengenali Anda.</p>
                <Button variant="outline" className="mt-4">Tambahkan</Button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <Edit className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Tambahkan bio</h3>
                <p className="text-sm text-gray-600">Perkenalkan diri Anda dan ceritakan apa yang Anda sukai.</p>
                <Button variant="outline" className="mt-4">Tambahkan</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="balasan">
          <p className="text-center text-gray-500 mt-4">Belum ada balasan</p>
        </TabsContent>
        <TabsContent value="ulang">
          <p className="text-center text-gray-500 mt-4">Belum ada postingan ulang</p>
        </TabsContent>
      </Tabs>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
          <Button variant="ghost" size="icon">
            <Home className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <PenSquare className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>
    </div>
  )
}
