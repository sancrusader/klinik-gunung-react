import { Button } from '@/Components/ui/button'
import Header from '@/Layouts/Header'
import { PageProps } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { Minus, Plus, Trash2 } from 'lucide-react'

type CartItem = {
  id: number
  product: {
    id: number
    name: string
    price: string
    image_path: string
  }
  quantity: number
}

interface CartProps extends PageProps {
  cartItems: CartItem[]
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(amount);
};


export default function Cart({ cartItems }: CartProps) {
    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

  return (
    <Header>
      <Head title="Your Cart" />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`/storage/${item.product.image_path}`}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-muted-foreground">
                    Rp {(item.quantity * parseFloat(item.product.price)).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-lg font-bold w-24 text-right">
                    {(item.quantity * parseFloat(item.product.price)).toFixed(2)}
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
              <div className="text-2xl font-bold">
                Total: Rp {formatCurrency(total)}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button>Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Header>
  )
}
