import { Button } from "@/Components/ui/button"
import Header from "@/Layouts/Header"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"
import { Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_path: string
}

export default function Index({ products = [] }: PageProps<{ products: Product[] }>) {
  const addToCart = (productId: number) => {
    router.post(`/product/cart/${productId}`, {}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        alert('Product added to cart successfully!')
      },
      onError: (errors) => {
        alert('Failed to add product to cart. Please try again.')
        console.error('Error adding to cart:', errors)
      },
    })
  }

  return (
    <Header>
      <Head title="Products" />
      <section className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image_path ? `/storage/${product.image_path}` : "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  <Button variant="outline" size="icon" className="absolute top-4 right-4">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${Number(product.price).toFixed(2)}</span>
                    <Button onClick={() => addToCart(product.id)}>Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">No products available.</p>
          )}
        </div>
      </section>
    </Header>
  )
}
