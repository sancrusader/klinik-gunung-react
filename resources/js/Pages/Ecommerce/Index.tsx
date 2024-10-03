import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({
    products = [],
}: PageProps<{
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        image_path: string;
    }[];
}>) {
    return (
        <section className="flex flex-wrap items-center justify-center py-8">
            <Head title="Product" />
            {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm m-4"
                    >
                        <div className="relative">
                            <img
                                src={
                                    product.image_path
                                        ? `/storage/${product.image_path}`
                                        : "/placeholder.svg"
                                }
                                alt={product.name}
                                width={400}
                                height={400}
                                className="w-full h-56 object-cover"
                                style={{
                                    aspectRatio: "400/400",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="absolute top-4 right-4">
                                <Button variant="outline" size="icon">
                                    <span className="sr-only">
                                        Add to Wishlist
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">
                                {product.name}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">
                                    {Number(product.price).toFixed(2)}
                                </span>
                                <Button size="lg">Add to Cart</Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </section>
    );
}
