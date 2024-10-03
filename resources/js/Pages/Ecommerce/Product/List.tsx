import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { PageProps } from "@/types";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/Components/ui/table";

import {
    Package2Icon,
    BellIcon,
    HomeIcon,
    ShoppingCartIcon,
    UsersIcon,
    PackageIcon,
    LineChartIcon,
    SearchIcon,
} from "lucide-react";

export default function List({
    products = [],
}: PageProps<{
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        image_path: string;
    }[];
}>) {
    console.log(products);
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link
                            href={route("dashboard")}
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Package2Icon className="h-6 w-6" />
                            <span className="">Acme Inc</span>
                        </Link>
                        <Button
                            variant="outline"
                            size="icon"
                            className="ml-auto h-8 w-8"
                        >
                            <BellIcon className="h-4 w-4" />
                            <span className="sr-only">
                                Toggle notifications
                            </span>
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <HomeIcon className="h-4 w-4" />
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <ShoppingCartIcon className="h-4 w-4" />
                                Orders
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            >
                                <PackageIcon className="h-4 w-4" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <UsersIcon className="h-4 w-4" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <LineChartIcon className="h-4 w-4" />
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link href="#" className="lg:hidden">
                        <Package2Icon className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                            >
                                <img
                                    src="/placeholder.svg"
                                    width="32"
                                    height="32"
                                    alt="Avatar"
                                    className="rounded-full"
                                    style={{
                                        aspectRatio: "32/32",
                                        objectFit: "cover",
                                    }}
                                />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center">
                        <h1 className="font-semibold text-lg md:text-2xl">
                            Products
                        </h1>
                        <Button className="ml-auto" size="sm">
                            <Link href={route("product.create")}>
                                Add product
                            </Link>
                        </Button>
                    </div>
                    <div className="border shadow-sm rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">
                                        Image
                                    </TableHead>
                                    <TableHead className="table-cell">
                                        Name
                                    </TableHead>
                                    <TableHead className="table-cell">
                                        Description
                                    </TableHead>
                                    <TableHead className="table-cell">
                                        Stock
                                    </TableHead>
                                    <TableHead className="table-cell">
                                        Price
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.isArray(products) &&
                                products.length > 0 ? (
                                    products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <img
                                                    src={
                                                        product.image_path
                                                            ? `/storage/${product.image_path}`
                                                            : "/placeholder.svg"
                                                    }
                                                    alt={product.name}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {product.description}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {product.stock}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {Number(product.price).toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <p className="text-center py-4">
                                                No products available.
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    );
}
