import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const ProfileHeader = ({ user }: { user: { name: string; avatar?: string } }) => {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 border-b border-gray-800">
            <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-6 h-6" />
                </Button>
            </div>
        </header>
    );
};

export default ProfileHeader;
