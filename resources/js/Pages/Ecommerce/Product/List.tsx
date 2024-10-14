import { Link,Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { PageProps } from "@/types";
import  AdminLayout  from "@/Layouts/AdminLayout";
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

export default function List({
    auth,
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
        <AdminLayout user={auth.user}>
            <Head title="List Product"/>
            <div className="flex flex-col">
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
                        <Button className="" size="sm">
                            <Link href={route("category.create")}>
                                Add Category
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
            </AdminLayout>
    );
}
