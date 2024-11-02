import { Button } from "@/Components/ui/button";
import { Home, Search, PenSquare, Heart, User } from "lucide-react";
import { Link } from "@inertiajs/react";

const Navigation = ({ userid }: { userid: number }) => {
  return (
    <nav className="sticky bottom-0 bg-white/70 backdrop-blur-lg border-t border-gray-200 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href={route('community')}>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Home className="w-6 h-6" />
        </Button>
        </Link>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Search className="w-6 h-6" />
        </Button>
        <Link href={`/community/post`}>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <PenSquare className="w-6 h-6" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Heart className="w-6 h-6" />
        </Button>
        <Link href={route('community.profile',userid)}>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <User className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
