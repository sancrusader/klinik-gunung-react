import { Button } from "@/Components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between p-4 max-w-3xl mx-auto">
          <h1 className="text-xl font-semibold">Klinik Gunung</h1>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </header>
    );
};

export default Header;
