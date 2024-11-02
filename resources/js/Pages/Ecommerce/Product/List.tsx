import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import AdminSidebar from "@/Layouts/Dashboard/AdminSidebar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PlusCircle } from "lucide-react";

export default function Component({
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
  return (
    <AdminSidebar header="Products">
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto">
          <Card className="m-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Products</CardTitle>
              <div className="flex space-x-2">
                <Link href={route("product.create")}>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </Link>
                <Link href={route("category.create")}>
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(products) && products.length > 0 ? (
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.image_path ? `/storage/${product.image_path}` : "/placeholder.svg"}
                              alt={product.name}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No products available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </AdminSidebar>
  );
}
