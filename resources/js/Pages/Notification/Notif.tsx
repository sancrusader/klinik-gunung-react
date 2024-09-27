import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { PageProps } from "@/types";
import HeaderParamedis from "@/Layouts/HeaderParamedis";

export default function Component({ auth }: PageProps<{}>) {
    return (
        <HeaderParamedis user={auth.user}>
            <div className="flex flex-col md:flex-row h-screen">
                <aside className="w-full md:w-64 border-r">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-lg font-semibold">
                                Notification
                            </span>
                        </div>
                        <div className="hidden md:flex flex-col flex-1 px-2">
                            <div className="flex items-center px-2 py-2">
                                <Avatar>
                                    <AvatarImage
                                        src="/placeholder-user.jpg"
                                        alt="Alicia Koch"
                                    />
                                    <AvatarFallback>AK</AvatarFallback>
                                </Avatar>
                                <span className="ml-2 font-medium">
                                    Alicia Koch
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="flex-1 overflow-hidden">
                    <div className="flex flex-col h-full">
                        <header className="flex items-center justify-between px-4 py-3 border-b">
                            <div className="flex space-x-2"></div>
                        </header>
                        <div className="flex flex-1 overflow-hidden">
                            <div className="w-full border-r overflow-y-auto">
                                <div className="p-4">
                                    <Input type="search" placeholder="Search" />
                                </div>
                                <ul className="space-y-1">
                                    <li className="px-4 py-2 bg-white">
                                        <div className="flex justify-between">
                                            <h2 className="font-semibold">
                                                William Smith
                                            </h2>
                                            <span className="text-sm text-gray-500">
                                                4 months ago
                                            </span>
                                        </div>
                                        <p className="text-sm">
                                            Meeting Tomorrow
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Hi, let's have a meeting tomorrow to
                                            discuss the project. I've been
                                            reviewing the project details and
                                            have some ideas I'd like to share.
                                            It's crucial that we...
                                        </p>
                                        <div className="flex space-x-1 text-xs font-medium">
                                            <Badge variant="secondary">
                                                work
                                            </Badge>
                                            <Badge variant="secondary">
                                                important
                                            </Badge>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </HeaderParamedis>
    );
}
