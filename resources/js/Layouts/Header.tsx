import { Link, Head } from "@inertiajs/react";
import { MountainIcon } from "lucide-react";
import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren)
{
    return(
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link href="/" className="flex items-center justify-center" >
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">

            <Link href="/product" className="text-sm font-medium hover:underline underline-offset-4" >
                Product
            </Link>
            <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4" >
                About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" >
                Contact
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4" >
                Blog
            </Link>
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" >
                Login
            </Link>
            <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4" >
                Register
            </Link>
            </nav>
      </header>
        {children}
    </div>
    )
}
